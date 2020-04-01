import React, {useState, useContext, useEffect} from 'react';
import { View, StyleSheet, TextInput,TouchableOpacity, Button, Text } from 'react-native';
// import RegisterComponent from '../components/RegisterComponent'
import {Context as authContext} from '../Context/authContext'
import {NavigationEvents} from 'react-navigation'
import { ApplicationProvider, Layout, Input} from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';

const signout = ({navigation}) => {
  const {signout} = useContext(authContext)
  return (
    <View>
    <Text>Here</Text>
          <Button
            title="Signout"
            onPress={signout}
            />
            </View>
)
}

const styles = StyleSheet.create({
})

export default signout
