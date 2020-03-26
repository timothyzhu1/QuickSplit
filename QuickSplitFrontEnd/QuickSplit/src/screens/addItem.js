import React, {useState, useContext} from 'react'
import { View, StyleSheet, TextInput, Button, TouchableOpacity, Text} from 'react-native';
// import RegisterComponent from '../components/RegisterComponent'
import {Context as itemContext} from '../Context/itemContext'
import { ApplicationProvider, Layout, Input} from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import NavLink from '../components/NavLink'

const addItem = ({navigation}) => {
  const [item, setItem] = useState("");
  const {state, addItem} = useContext(itemContext)
  return (
  <View>
    <Text>Please enter the item name: </Text>
    <TextInput
      style={styles.input}
      onChangeText={(item) => setItem(item)}
      >
    </TextInput>
    <TouchableOpacity
      onPress={() => addItem({item})}
      >
      <Text>Submit</Text>
    </TouchableOpacity>
    <Text>{state.noAdd}</Text>
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
export default addItem
