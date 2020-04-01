import React, {useState, useContext, useEffect} from 'react';
import { View, StyleSheet, TextInput, Button, Text, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import { ListItem } from 'react-native-elements'
// import RegisterComponent from '../components/RegisterComponent'
import {Context as groupContext} from '../Context/groupContext'
import { ApplicationProvider, Layout, Input} from '@ui-kitten/components';
import {NavigationEvents} from 'react-navigation'
import { mapping, light as lightTheme } from '@eva-design/eva';
import NavLink from '../components/NavLink'
import {Constants} from 'expo'
import {navigate} from '../navigationRef'
import { AsyncStorage} from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';


let activeGlobal, setActiveGlobal;

const listofGroups = ({navigation}) => {
    const {state, getgroupNames, joinGroup, createGroup, deleteGroup} = useContext(groupContext);
    const [groups, setGroups] = useState(null);
    const [active, setActive] = useState(false);
    const [secondModal, setsecondModal] = useState(false);
    const [groupCode, setGroupCode] = useState('');
    const [newGroupName, setnewgroupName] = useState('')

    activeGlobal = active;
    setActiveGlobal = setActive;
    console.log(groupCode)
    useEffect(() => {
        getgroupNames();

    },[]);
    const alert = (group) => {
        console.log(group)
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
                            <Ionicons name="ios-remove-circle-outline" style={styles.deleteGroup} size={35} color="black"/>
                        </TouchableOpacity >
                    </TouchableOpacity>
                }
                keyExtractor={(item, index) => item.id }
            />
            <Modal
                visible={active}
                animationType="slide"
                transparent={true}
                >
                <View style={styles.modalView}>
                    <Text>Enter the Group Code Here</Text>
                    <TextInput
                        placeholder="Enter code here"
                        onChangeText={(groupCode) => setGroupCode(groupCode)}
                        >

                    </TextInput>
                <TouchableOpacity
                    onPress={() => setActive(!active)}
                    >
                    <Entypo name="circle-with-cross" size={50} color="black"/>
                    <TouchableOpacity
                        onPress={() => joinGroup({groupCode})}
                        >
                        <Text>Join Group</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            {setsecondModal(!secondModal),
                            setActive(!active)}
                            }
                        >
                        <Text>Create a group here</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
                </View>
            </Modal>
            <Modal
                visible={secondModal}
                animationType="slide"
                transparent={true}
                >
                <View style={styles.modalView}>
                    <Text>Enter the Name of your Group</Text>
                    <TextInput
                        placeholder="Enter Name here"
                        onChangeText={(newGroupName) => setnewgroupName(newGroupName)}
                        >

                    </TextInput>
                    <Text>{groupCode}</Text>
                <TouchableOpacity
                    onPress={() => setsecondModal(!secondModal)}
                    >
                    <Entypo name="circle-with-cross" size={50} color="black" style={styles.add}/>
                    <TouchableOpacity
                        onPress={() => createGroup({newGroupName})}>
                        <Text>Create Group</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            {setsecondModal(!secondModal),
                            setActive(!active)}
                            }
                        >
                        <Text>Join a group here</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

listofGroups.navigationOptions = ({navigation}) => {
    return {
        headerTitle: <Text style={{fontSize: 20, marginTop: 5}}>Groups</Text>,
        headerRight:
            <TouchableOpacity
                onPress={() => {setActiveGlobal(!activeGlobal)}}
                style={{marginRight: 10}}>
                <Entypo name="circle-with-plus" size={32} color="black" />
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
    marginVertical: 8,
    marginHorizontal : 10,
    elevation: 4,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#fff',
    shadowOffset: {
        height: 5
    },
    shadowColor: 'gray',
    shadowRadius: 2,
    shadowOpacity: 0.6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
},
modalView: {
  margin: 70,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 35,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5
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
    fontSize: 35,
    paddingRight: 5
}
})
export default listofGroups;
