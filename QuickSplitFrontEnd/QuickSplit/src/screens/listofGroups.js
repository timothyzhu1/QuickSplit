import React, {useState, useContext, useEffect} from 'react';
import { View, StyleSheet, TextInput, Button, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
// import RegisterComponent from '../components/RegisterComponent'
import {Context as groupContext} from '../Context/groupList'
import { ApplicationProvider, Layout, Input} from '@ui-kitten/components';
import {NavigationEvents} from 'react-navigation'
import { mapping, light as lightTheme } from '@eva-design/eva';
import NavLink from '../components/NavLink'
import {Constants} from 'expo'
import {navigate} from '../navigationRef'
import { AsyncStorage} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';

const listofGroups = ({navigation}) => {
  const {state, groupNames} = useContext(groupContext)
  const [groups, setGroups] = useState(null)
  useEffect(() => {
    groupNames();
  },[])
  return (
    <View>
      <TouchableOpacity
          onPress={() => {navigate('addGroup')}}
                >
        <Entypo name="circle-with-plus" size={32} color="black" />
      </TouchableOpacity>
      <Text style={styles.text}>List of Groups: </Text>
      <FlatList
        data={Object.keys(state.groupNames)}
        renderItem = {({item}) =>
        <TouchableOpacity
          style={styles.list}
          onPress={
            () => {navigate('itemLists', state.groupNames[item])}}>
          <Text>{state.groupNames[item]}</Text>
        </TouchableOpacity>
      }
      keyExtractor={(item, index) => item.index }
        />

    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    textAlign: 'center',
    paddingTop: 100
  },
  list: {
    fontSize: 25
  }
})
export default listofGroups
