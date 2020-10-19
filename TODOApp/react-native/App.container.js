import React from 'react';
import {AppearanceProvider} from 'react-native-appearance';
import FlashMessage from 'react-native-flash-message';
import SplashScreen from './screens/splashScreen/SplashScreen';

const TodoApp = () => {
  let ref = React.forwardRef();
  return (
    <AppearanceProvider>
      <SplashScreen />
      <FlashMessage position="top" ref={ref} />
    </AppearanceProvider>
  );
};

export default TodoApp;
