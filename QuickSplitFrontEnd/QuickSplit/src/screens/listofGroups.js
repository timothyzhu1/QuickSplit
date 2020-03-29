import React, {useState, useContext, useEffect} from 'react';
import { View, StyleSheet, TextInput, Button, Text, FlatList, TouchableOpacity, Modal } from 'react-native';
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
import { Ionicons, Entypo } from '@expo/vector-icons';

const listofGroups = ({navigation}) => {
    const {state, getgroupNames} = useContext(groupContext);
    const [groups, setGroups] = useState(null);
    const [active, setActive] = useState(false);

    listofGroups.navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Text style={{fontSize: 20, marginTop: 5}}>Groups</Text>,
            headerRight:
                <TouchableOpacity onPress={() => {navigate('addGroup')}} style={{marginRight: 10}}>
                  <Entypo name="circle-with-plus" size={32} color="black" />
                </TouchableOpacity>
        };
    };
    useEffect(() => {
        getgroupNames();

    },[]);

    return (
        <View style={{flex: 1}}>
            <FlatList
                style = {{flex: 1}}
                data={Object.keys(state.groupNames)}
                renderItem = {({item}) =>
                    <TouchableOpacity
                        style={styles.list}
                        onPress={
                            () => {navigate('itemLists', state.groupNames[item])}}>
                        <Text style={styles.groups}>{state.groupNames[item]}</Text>
                    </TouchableOpacity>
                }
                keyExtractor={(item, index) => item.index }
            />
        <TouchableOpacity onPress={() => setActive(!active)}>
              <Entypo name="circle-with-plus" size={50} color="black" style={styles.add}/>
            </TouchableOpacity>
            <Modal
                visible={active}
                animationType="slide"
                transparent={true}
                >
                <View style={styles.modalView}>
                    <Text>Please Enter the Group Code Here</Text>
                    <TextInput style={styles.input}>

                    </TextInput>
                <TouchableOpacity
                    onPress={() => setActive(!active)}
                    >
                    <Text style={styles.text}>CLICK HERE TO CLOSE</Text>
                    <TouchableOpacity>
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};




const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    textAlign: 'center',
    paddingTop: 50
    //paddingTop: 100
  },
  list: {
    fontSize: 25,
    color: 'rgba(255, 87, 51, 0.9)',
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
    borderColor: "red",
    borderWidth: 3,
    color: 'black',
    paddingRight: 10
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
}
})
export default listofGroups;
