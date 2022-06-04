import {Navigation} from 'react-native-navigation';
import {ScreenName} from '~/config/screens-name';

export function gotoCountriesDetail(componentId: string, data: {}) {
  Navigation.push(componentId, {
    component: {
      name: ScreenName.detail,
      passProps: {
        data,
      },
      options: {
        topBar: {
          visible: true,
        },
      },
    },
  });
}

export function gotoContinentDetail(componentId: string, data: {}) {
  Navigation.push(componentId, {
    component: {
      name: ScreenName.continent,
      passProps: {
        data,
      },
      options: {
        topBar: {
          visible: true,
        },
      },
    },
  });
}
