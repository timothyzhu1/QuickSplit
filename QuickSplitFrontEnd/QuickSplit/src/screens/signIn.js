import React, {useState, useContext} from 'react';
import { View, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
// import RegisterComponent from '../components/RegisterComponent'
import {Context as authContext} from '../Context/authContext'
import { ApplicationProvider, Layout, Input, Text} from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';

const signIn = ({navigation}) => {
  const {state, signin} = useContext(authContext)
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <Layout>
        <Text style={styles.text}>Enter Username:</Text>
      <Input
        style={styles.input}
        placeholder= "Username"
        value= {user}
        onChangeText={(user) => setUser(user)}
        />
      <Text style={styles.text}>
            Enter Password:
          </Text>
          <Input
            style={styles.input}
            placeholder= "Password"
            secureTextEntry={true}
            value = {pass}
            onChangeText={(pass) => setPass(pass)}
            />
          <Button
            title="Submit"
            onPress={()=> signin({user, pass})}
            />
          <Text style={styles.invalid}>{state.invalid}</Text>
          <Text style={styles.invalid}>{state.username}</Text>
        </Layout>
        <TouchableOpacity onPress = {() => navigation.navigate('signup')}>
          <Text>Dont have an account? Sign In here</Text>
        </TouchableOpacity>
    </ApplicationProvider>
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
    marginLeft: 5
  }
})
export default signIn
