import React, {useState, useContext} from 'react'
import { View, StyleSheet, TextInput, Button, TouchableOpacity, Text} from 'react-native';
// import RegisterComponent from '../components/RegisterComponent'
import {Context as itemContext} from '../Context/itemContext'
import { ApplicationProvider, Layout, Input} from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import NavLink from '../components/NavLink'

const addGroup = ({navigation}) => {
  const [group, setGroup] = useState("");
  const {state, addGroup} = useContext(itemContext)
  return (
  <View>
    <Text>Please enter the group's code: </Text>
    <TextInput
      style={styles.input}
      onChangeText={(group) => setGroup(group)}
      >
    </TextInput>
    <TouchableOpacity
      onPress={() => addGroup({group})}
      >
      <Text>Submit</Text>
      <Text>{state.addGroup}</Text>
    </TouchableOpacity>
  </View>
)
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
    marginLeft: 5,
    borderWidth: 2,
    borderColor: 'black',
    height: 30
  }
})
export default addGroup
