import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import signin from './src/screens/signIn'

const navigator = createStackNavigator({
  login: signin},
{
  initalRouteName: 'signin',
  defaultNavigationOptions: {
    title: 'QuickSplit'
  }
})

export default createAppContainer(navigator);
