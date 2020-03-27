import React, {useState, useContext, useEffect} from 'react';
import { View, StyleSheet, TextInput, Button, Text, FlatList, TouchableOpacity } from 'react-native';
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

    useEffect(() => {
        getgroupNames();
    },[]);
//<NavigationEvents onWillFocus={getgroupNames}/>

    return (
        <View>
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
    );
};



listofGroups.navigationOptions = ({navigation}) => {
    return {
        headerTitle: <Text style={{fontSize: 20, marginTop: 5}}>Groups</Text>,
        headerRight:
            <TouchableOpacity onPress={() => {navigate('addGroup')}} style={{marginRight: 10}}>
              <Entypo name="circle-with-plus" size={32} color="black" />
            </TouchableOpacity>
    };
};


const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    textAlign: 'center',
    //paddingTop: 100
  },
  list: {
    fontSize: 25,
    color: 'rgba(255, 87, 51, 0.9)',
    marginVertical: 10

  }
})
export default listofGroups;
