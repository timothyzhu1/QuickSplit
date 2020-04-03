import React, {useState, useContext, useEffect} from 'react'
import { View, StyleSheet, TextInput, Button, TouchableOpacity, Text, FlatList} from 'react-native';
// import RegisterComponent from '../components/RegisterComponent'
import {Context as itemContext} from '../Context/itemContext'
import { ApplicationProvider, Layout, Input} from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import NavLink from '../components/NavLink'
import { AsyncStorage} from 'react-native';
import {navigate} from '../navigationRef'
import JoinGroupModal from '../components/joinGroupModal'
import { Entypo, AntDesign, Feather } from '@expo/vector-icons';
import {Context as modalContext} from '../Context/modalContext';


let globalSetModal1State;

const itemLists = ({navigation}) => {
  const {state, itemList, retMembers} = useContext(itemContext)
  const groupName = navigation.state.params;
  const ModalStateObj = useContext(modalContext);

  globalSetModal1State = ModalStateObj.setModal1State;

  useEffect(() => {
    itemList(groupName);
    retMembers(groupName)
  }, []);

  itemLists.navigationOptions = ({navigation}) => {
      return {
        headerStyle: {
          backgroundColor: '#28c716',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        },
          headerTitle: <Text style={{fontSize: 30, marginTop: 3, color: 'white', fontFamily: 'Kohinoor Bangla'}}>Your Items</Text>,
          headerRight:
              <TouchableOpacity
                  onPress={() => {globalSetModal1State();}}
                  style={{marginRight: 20}}>
                  <AntDesign name="pluscircleo" size={30} color="white" />
              </TouchableOpacity>
      };
  };
  console.log(state.members)
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
            <FlatList
                data={state.members.groupMembers}
                renderItem = {
                    ({item}) =>
                    <Text style={styles.list}>{item}</Text>
                }
                keyExtractor={(item, index) => 'key'+index} //lol kinda wierd but whatever

            />
            <JoinGroupModal
            title="Add Item"
            buttonTitle="Add Item"
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
