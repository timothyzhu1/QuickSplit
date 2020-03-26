import React, {useState, useContext} from 'react'
import { View, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native';
// import RegisterComponent from '../components/RegisterComponent'
import {Context as authContext} from '../Context/authContext'
import { ApplicationProvider, Layout, Input, Text} from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import NavLink from '../components/NavLink'

const addGroup = ({navigation}) => {
  return (
  <View>
  </View>
)
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center'
  },
  text:{
    padding: 10
  },
  invalid: {
    color: 'black'
  },
  input: {
    flexDirection: 'column',
    padding: 5,
    marginLeft: 5
  }
})
export default addGroup
