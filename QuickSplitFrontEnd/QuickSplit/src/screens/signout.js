import React, {useState, useContext, useEffect} from 'react';
import { View, StyleSheet, TextInput,TouchableOpacity, Button, Text } from 'react-native';
// import RegisterComponent from '../components/RegisterComponent'
import {Context as authContext} from '../Context/authContext'
import {NavigationEvents} from 'react-navigation'
import { ApplicationProvider, Layout, Input} from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
};

signout.navigationOptions = {
    title: 'Account',
    tabBarIcon: <MaterialCommunityIcons name="account-box-outline" size={30}/>
};
//s

const styles = StyleSheet.create({
})

export default signout
