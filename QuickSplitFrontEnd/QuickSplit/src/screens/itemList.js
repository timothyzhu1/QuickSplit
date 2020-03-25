import React, {useState, useContext, useEffect} from 'react'
import { View, StyleSheet, TextInput, Button, TouchableOpacity, Text} from 'react-native';
// import RegisterComponent from '../components/RegisterComponent'
import {Context as itemContext} from '../Context/itemContext'
import { ApplicationProvider, Layout, Input} from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import NavLink from '../components/NavLink'
import { AsyncStorage} from 'react-native';

const itemLists = ({navigation}) => {
  const {state, itemList} = useContext(itemContext)
  const groupName = navigation.state.params
  AsyncStorage.setItem('groupName', groupName);
  useEffect(() => {
    itemList()
  }, [])
  console.log(state)
  return (
    <View>
    <Text>These r the following items u have</Text>
    <Text>{state.items}</Text>
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
export default itemLists
