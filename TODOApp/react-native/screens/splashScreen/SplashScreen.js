import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import CreateTask from '../createTask/CreateTask';
import AppRouter from '../../routing/appRouter';

const SplashScreen = () => {
  const [task, setTask] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      setTask(true);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  let renderLottieView = () => {
    return <LottieView source={require('./todo.json')} autoPlay loop />;
  };

  let renderCreateTask = () => {
    return <AppRouter />;
  };

  return task ? renderCreateTask() : renderLottieView();
};

export default SplashScreen;
