/* eslint-disable */
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import {
    NavigationContainer,
    DarkTheme,
    useNavigation,
} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import {Colors} from '../constants/Colors';
const MyTheme = {
    dark: false,
    colors: {
        primary: 'white',
        background: 'white',
        card: Colors.accent,
        text: 'white',
        border: 'green',
    },
};
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CommonActions } from '@react-navigation/native';
import CreateTask from '../screens/createTask/CreateTask';
import AssignEmployee from '../screens/assignEmployee/AssignEmployee';
import TaskCompleted from '../screens/taskCompleted/TaskCompleted';
const RootStack = createStackNavigator();

const AppRouter = props => {
    const colorScheme = useColorScheme();

    const HeaderBackLeft = () => {
        const navigation = useNavigation();
        return (
            <View style={{flexDirection: 'row', marginLeft: 10}}>
                <TouchableOpacity
                    onPress={() => {
                        const popAction = CommonActions.goBack();
                        navigation.dispatch(popAction);
                    }}>
                    <Icon name="keyboard-arrow-left" size={32} color="white"/>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <NavigationContainer theme={colorScheme == 'dark' ? DarkTheme : MyTheme}>

            <RootStack.Navigator>
                <RootStack.Screen
                    name="createTask"
                    component={CreateTask}
                    options={{
                       title: 'Create Task'
                    }}
                />
                <RootStack.Screen
                    name="assignEmployee"
                    component={AssignEmployee}
                    options={{
                        title: 'Assign',
                        headerLeft: props => <HeaderBackLeft />,
                    }}
                />
                <RootStack.Screen
                    name="TaskCompleted"
                    component={TaskCompleted}
                    options={{
                        title: 'Task Saved',
                        headerLeft: props => <HeaderBackLeft />,
                    }}
                />
            </RootStack.Navigator>

        </NavigationContainer>
    );
};

export default AppRouter;
