/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TodoApp from './react-native/App.container'

AppRegistry.registerComponent(appName, () => TodoApp);
