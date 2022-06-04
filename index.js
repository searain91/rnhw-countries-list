import {Navigation} from 'react-native-navigation';
import {HomeScreen} from '~/HomeScreen/views/HomeScreen';
import {CountryDetailScreen} from './src/CountryDetail/views/CountryDetailScreen';
import {ContinentDetailScreen} from './src/ContinentDetail/views/ContinentDetailScreen';
import {ScreenName} from './src/config/screens-name';

Navigation.registerComponent(ScreenName.home, () => HomeScreen);
Navigation.registerComponent(ScreenName.detail, () => CountryDetailScreen);
Navigation.registerComponent(ScreenName.continent, () => ContinentDetailScreen);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: ScreenName.home,
            },
          },
        ],
        options: {
          topBar: {
            visible: false,
          },
        },
      },
    },
  });
});
