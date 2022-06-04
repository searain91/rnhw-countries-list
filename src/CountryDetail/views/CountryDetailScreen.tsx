import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {NavigationFunctionComponent} from 'react-native-navigation';
import gql from 'graphql-tag';
import {client} from '../../config/client';
import {gotoContinentDetail} from '~/navigation/home';

type Props = {
  data: {
    code: string;
  };
};

const GET_COUNTRY_DETAILS = gql`
  query Country($code: ID!) {
    country(code: $code) {
      name
      native
      emoji
      currency
      code
      phone
      languages {
        code
        name
      }
      continent {
        name
      }
    }
  }
`;

export const CountryDetailScreen: NavigationFunctionComponent<Props> = props => {
  const [
    countriesData,
    setCountriesData,
  ] = useState<countryDetail.CountryModel>();

  useEffect(() => {
    getCountryDetail();
  });

  const getCountryDetail = async () => {
    const {data} = await client.query({
      query: GET_COUNTRY_DETAILS,
      variables: {code: props.data.code},
    });
    console.log('data', data.country);
    setCountriesData(data.country);
  };

  const goToContinentDetailScreen = () => {
    gotoContinentDetail(props.componentId, {
      code: props.data.code,
      continentName: countriesData?.continent.name,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.emoji}>{countriesData?.emoji}</Text>
        <Text style={styles.name}>{countriesData?.name}</Text>
      </View>
      <View style={styles.content}>
        <Text>{'alpha2Code'}</Text>
        <Text>{countriesData?.code}</Text>
      </View>
      <View style={styles.content}>
        <Text>{'callingCodes'}</Text>
        <Text>{`+${countriesData?.phone}`}</Text>
      </View>
      <View style={styles.content}>
        <Text>{'continent'}</Text>
        <TouchableOpacity onPress={goToContinentDetailScreen}>
          <Text style={styles.underline}>{countriesData?.continent.name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  headerView: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 80,
  },
  name: {
    fontWeight: '700',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  underline: {
    textDecorationLine: 'underline',
    color: 'blue',
  },
});
