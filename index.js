import '@walletconnect/react-native-compat';
import 'react-native-reanimated';
import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {enableTypography} from './src/utils/typegraphy';

enableTypography();

LogBox.ignoreLogs([
  'Animated:',
  'Function components cannot be given refs',
  'Require cycle: node_modules/net/index.js -> node_modules/net/index.js',
  'interpolate() was renamed to interpolateNode()',
  'Warning: Failed prop type: Invalid prop `externalScrollView`',
  'Usage of "messaging().registerDeviceForRemoteMessages()" is not required',
  'Non-serializable values were found in the navigation state. Check',
  "Accessing the 'state' property of the 'route' object is not supported",
  'react-native-extra-dimensions-android is only available on Android',
  'EventEmitter',
  'VirtualizedLists should never be nested inside plain ScrollViews',
  'ViewPropTypes will be removed',
  'Using Math.random',
]);

AppRegistry.registerComponent(appName, () => App);
