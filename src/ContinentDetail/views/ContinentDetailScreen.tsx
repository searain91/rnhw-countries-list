import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ListRenderItem,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {NavigationFunctionComponent} from 'react-native-navigation';
import gql from 'graphql-tag';
import {client} from '../../config/client';
import {gotoCountriesDetail} from '~/navigation/home';

type Props = {
  data: {
    code: string;
    continentName?: string;
  };
};

const GET_CONTINENT_DETAILS = gql`
  query Country($code: ID!) {
    country(code: $code) {
      continent {
        name
        code
        countries {
          code
          name
        }
      }
    }
  }
`;

export const ContinentDetailScreen: NavigationFunctionComponent<Props> = props => {
  const [
    continentData,
    setContinentData,
  ] = useState<continentDetail.CountryModel>();

  useEffect(() => {
    getCountryDetail();
  });

  const getCountryDetail = async () => {
    const {data} = await client.query({
      query: GET_CONTINENT_DETAILS,
      variables: {code: props.data.code},
    });
    setContinentData(data.country);
  };

  const gotoDetails = (code: string) => {
    gotoCountriesDetail(props.componentId, {code});
  };

  const renderItem: ListRenderItem<continentDetail.Countries> = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.viewDetail}
        onPress={() => gotoDetails(item.code)}>
        <Text style={styles.underline}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: continentDetail.Countries, index: number) =>
    `ContinentDetailScreen-${item.name}-${index}`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.name}>{continentData?.continent.name || ''}</Text>
      </View>
      <View style={styles.content}>
        <Text>{'code'}</Text>
        <Text>{continentData?.continent.code}</Text>
      </View>
      <View style={styles.contentFlatList}>
        <Text>{'countries'}</Text>
        <FlatList
          style={styles.flatlist}
          contentContainerStyle={styles.contentContainer}
          data={continentData?.continent.countries || []}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  headerView: {
    marginTop: 20,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 80,
  },
  name: {
    fontWeight: '700',
    fontSize: 20,
  },
  contentFlatList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
  underline: {
    textDecorationLine: 'underline',
    color: 'blue',
  },
  flatlist: {
    flex: 1,
    marginTop: 10,
  },
  viewDetail: {
    flexDirection: 'column',
    marginLeft: 5,
    alignItems: 'flex-end',
    paddingVertical: 2,
  },
  contentContainer: {
    display: 'flex',
    flexGrow: 1,
  },
});
