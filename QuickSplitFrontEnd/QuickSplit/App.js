import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import signin from './src/screens/signIn'
import signup from './src/screens/signUp'
import listofGroups from './src/screens/listofGroups'
import {Provider as AuthProvider} from './src/Context/authContext'

const mainNavigator = createSwitchNavigator({
  login: createStackNavigator({
    signin: signin,
    signup: signup
  }),
  main: createBottomTabNavigator({
    groupList: listofGroups
  })
})

const App = createAppContainer(mainNavigator);

export default () => {
  return( <AuthProvider>
    <App />
  </AuthProvider>
);
}
