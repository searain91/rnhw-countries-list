import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import {NavigationFunctionComponent} from 'react-native-navigation';

import gql from 'graphql-tag';
import {gotoCountriesDetail} from '../../navigation/home';
import {client} from '../../config/client';

const GET_COUNTRIES = gql`
  {
    countries {
      emoji
      code
      native
      capital
    }
  }
`;

export const HomeScreen: NavigationFunctionComponent<Props> = props => {
  const [countriesData, setCountriesData] = useState<
    homeScreen.CountriesModel[]
  >([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const {data} = await client.query({
      query: GET_COUNTRIES,
    });
    setCountriesData(data.countries);
  };

  const gotoDetails = (code: string) => {
    gotoCountriesDetail(props.componentId, {code});
  };

  const renderItem: ListRenderItem<homeScreen.CountriesModel> = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.borderView}
        onPress={() => gotoDetails(item.code)}>
        <Text style={styles.emoji}>{item.emoji}</Text>
        <View style={styles.viewDetail}>
          <Text style={styles.native}>{item.native}</Text>
          <Text style={styles.capital}>{item.capital}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: homeScreen.CountriesModel, index: number) =>
    `HomeScreen-${item.code}-${index}`;

  const renderHeader = () => {
    return <Text style={styles.headerList}>{'List of countries'}</Text>;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerView} />
      <FlatList
        style={styles.flatlist}
        data={countriesData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
      />
    </SafeAreaView>
  );
};

//#region
type Props = {};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    flexDirection: 'column',
  },
  headerView: {
    backgroundColor: 'pink',
    borderBottomLeftRadius: 40,
    height: 200,
  },
  borderView: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: 'white',
  },
  headerList: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: 15,
    fontWeight: '700',
  },
  flatlist: {
    marginTop: 10,
  },
  emoji: {
    fontSize: 60,
    textAlign: 'center',
  },
  viewDetail: {
    flexDirection: 'column',
    marginLeft: 5,
  },
  native: {fontWeight: '700'},
  capital: {fontWeight: '400', color: 'gray'},
});

//#endregion
