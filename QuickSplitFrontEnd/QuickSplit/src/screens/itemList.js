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

  useEffect(() => {
    itemList(groupName);
    retMembers(groupName)
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
  console.log(state.items)
  return (
    <View>

        <Text>The Group Code for this group is: </Text>
        <Text>{state.groupID}</Text>
        <Text>These r the following items u have</Text>
        <FlatList
            data={state.items}
            renderItem = {
                ({item}) =>
                <Text style={styles.list}>{item.itemName} was added by {item.addedBy}. The price is {item.price}</Text>
            }
            keyExtractor={(item, index) => (item.id).toString() }
        />
            <Text>These r ur members</Text>
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
},
list: {
  fontSize: 25,
  color: 'black',
  marginVertical: 6,
  elevation: 4,
  borderRadius: 6,
  backgroundColor: '#fff',
  shadowOffset: {
      width: 1,
      height: 1
  },
  shadowRadius: 2,
  marginHorizontal : 15,
  shadowOpacity: 0.4,
  flexDirection: 'row',
  fontFamily: 'Kohinoor Bangla',
},
groups:{
    marginVertical: 10,
    fontFamily: 'Kohinoor Bangla',
    fontSize: 20,
    marginHorizontal: 10
},
})
export default itemLists;
