import React, {useState, useContext, useEffect} from 'react';
import { View, StyleSheet, TextInput, Button, Text, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import { ListItem } from 'react-native-elements'
// import RegisterComponent from '../components/RegisterComponent'
import {Context as groupContext} from '../Context/groupContext';
import {Context as modalContext} from '../Context/modalContext';
import { ApplicationProvider, Layout, Input} from '@ui-kitten/components';
import {NavigationEvents} from 'react-navigation'
import { mapping, light as lightTheme } from '@eva-design/eva';
import NavLink from '../components/NavLink';
import JoinGroupModal from '../components/joinGroupModal'
import {Constants} from 'expo'
import {navigate} from '../navigationRef'
import { AsyncStorage} from 'react-native';
import { Entypo, AntDesign, Feather } from '@expo/vector-icons';


let personName;

let globalSetModal1State;

console.log(personName)
const listofGroups = ({navigation}) => {
    const {state, getgroupNames, joinGroup, createGroup, deleteGroup, getPersonName} = useContext(groupContext);
    const ModalStateObj = useContext(modalContext);

    globalSetModal1State = ModalStateObj.setModal1State;

    const [groups, setGroups] = useState(null);

    personName = state.personName;
    //console.log(personName);
    useEffect(() => {
        getgroupNames();
        getPersonName();
    },[]);
    const alert = (group) => {
        Alert.alert('Leaving A Group', 'Are you sure you would like to leave this group?', [
            {text: 'Yes', onPress: () => deleteGroup(group)},
            {text: 'No', onPress: () => console.log('no')}
        ])
    }
    return (
        <View style={styles.container}>
            <FlatList
                style = {{flex: 1}}
                data={state.groupNames}
                renderItem = {
                    ({item}) =>
                    <TouchableOpacity
                        style={styles.list}
                        onPress={
                            () => {navigate('itemLists', item.group)}}>
                        <Text style={styles.groups}>{item.group}</Text>
                        <TouchableOpacity
                            onPress={() => alert(item.group)}>
                            <Feather name="trash-2" style={styles.deleteGroup} color="black"/>
                        </TouchableOpacity >
                    </TouchableOpacity>
                }
                keyExtractor={(item, index) => item.id }
            />
            <JoinGroupModal />
        </View>
    );
};

listofGroups.navigationOptions = ({navigation}) => {
    return {
      headerStyle: {
        backgroundColor: '#28c716',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
      },
        headerTitle: <Text style={{fontSize: 30, marginTop: 3, color: 'white', fontFamily: 'Kohinoor Bangla'}}>Your Groups</Text>,
        headerRight:
            <TouchableOpacity
                onPress={() => {globalSetModal1State();}}
                style={{marginRight: 20}}>
                <AntDesign name="pluscircleo" size={30} color="white" />
            </TouchableOpacity>
    };
};



const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: 'rgb(246,248,249)',
    },
  text: {
    fontSize: 25,
    textAlign: 'center',
    paddingTop: 50
    //paddingTop: 100
  },
  list: {
    fontSize: 25,
    color: 'rgba(255, 87, 51, 0.9)',
    justifyContent: 'space-between',
    marginVertical: 15,
    marginHorizontal : 10,
    elevation: 4,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'green',
    backgroundColor: '#fff',
    shadowOffset: {
        height: 5
    },
    shadowColor: 'grey',
    shadowRadius: 2,
    shadowOpacity: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
},
input: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    color: 'black',
    marginRight: 10,
    height: 48
},
groups:{
    marginVertical: 10,
    fontFamily: 'Kohinoor Bangla',
    fontSize: 20,
    marginHorizontal: 10
},
add: {
    alignSelf: 'flex-end',
    position: 'absolute'
},
deleteGroup: {
    fontSize: 30,
    marginRight: 10
}
})
export default listofGroups;
