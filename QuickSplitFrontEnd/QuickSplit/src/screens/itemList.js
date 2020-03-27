import React, {useState, useContext, useEffect} from 'react'
import { View, StyleSheet, TextInput, Button, TouchableOpacity, Text, FlatList} from 'react-native';
// import RegisterComponent from '../components/RegisterComponent'
import {Context as itemContext} from '../Context/itemContext'
import { ApplicationProvider, Layout, Input} from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import NavLink from '../components/NavLink'
import { AsyncStorage} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import {navigate} from '../navigationRef'

const itemLists = ({navigation}) => {
  const {state, itemList, retMembers} = useContext(itemContext)
  const groupName = navigation.state.params;

  AsyncStorage.setItem('groupName', groupName);
  useEffect(() => {
    itemList();
    retMembers();
  }, []);

  itemLists.navigationOptions = ({navigation}) => {
      return {
          headerTitle: <Text style={{fontSize: 20, marginTop: 5}}>Items</Text>,
          headerRight:
              <TouchableOpacity onPress={() => {navigate('addItem')}}>
                  <Entypo name="circle-with-plus" size={32} color="black" />
              </TouchableOpacity>
      };
  };
  
  return (
    <View>

        <Text>The Group Code for this group is: </Text>
        <Text>{state.groupID}</Text>
        <Text>These r the following items u have</Text>
        <FlatList
            data={Object.keys(state.items)}
            renderItem = {({item}) =>
                <Text>{state.items[item]}</Text>
            }
            keyExtractor={(item, index) => item.index }
        />
            <Text>These r ur members</Text>
        <FlatList
            data={Object.keys(state.members)}
            renderItem = {({item}) =>
              <Text>{state.members[item]}</Text>
            }
            keyExtractor={(item, index) => item.index }
        />
    </View>
  );
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
export default itemLists;
