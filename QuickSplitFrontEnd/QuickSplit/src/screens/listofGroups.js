import React, {useState, useContext, useEffect} from 'react';
import { View, StyleSheet, TextInput, Button, Text, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements'
// import RegisterComponent from '../components/RegisterComponent'
import {Context as groupContext} from '../Context/groupList'
import { ApplicationProvider, Layout, Input} from '@ui-kitten/components';
import {NavigationEvents} from 'react-navigation'
import { mapping, light as lightTheme } from '@eva-design/eva';
import NavLink from '../components/NavLink'
const listofGroups = ({navigation}) => {
  const {state, groupNames} = useContext(groupContext)
  const [groups, setGroups] = useState(null)
  useEffect(() => {
    groupNames();
  },[])
  return (
    <View>
      <Text style={styles.text}>List of Groups: </Text>

    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    textAlign: 'center',
    paddingTop: 100
  }
})
export default listofGroups
