import React, {useState, useContext} from 'react'
import { View, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native';
// import RegisterComponent from '../components/RegisterComponent'
import {Context as authContext} from '../Context/authContext'
import { ApplicationProvider, Layout, Input, Text} from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import NavLink from '../components/NavLink'

const signUp = ({navigation}) => {
  const {state, signup} = useContext(authContext)
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  return (
        <View style={styles.container}>

              <Text style={styles.title}>QuickSplit</Text>
            <LottieView
            source={require('../images/animation3.json')}
            autoPlay
            loop
            style={styles.animation}
            />
        <KeyboardAvoidingView
            keyboardVerticalOffset={20}
            behavior="padding"
            >
          <TextInput
            style={styles.input}
            placeholder= "Username"
            value= {user}
            onChangeText={(user) => setUser(user)}
            />
        <TextInput
            style={styles.input}
            placeholder= "Password"
            secureTextEntry={true}
            value = {pass}
            onChangeText={(pass) => setPass(pass)}
            />
        <TouchableOpacity
                style={styles.button}
                onPress={()=> signin({user, pass})}
                >
        <Text style={styles.signIn}>Sign In</Text>
        </TouchableOpacity>
        </KeyboardAvoidingView>
              <Text style={styles.invalid}>{state.invalid}</Text>
            <NavLink
                routeName="signup"
                text="Dont have an account? Sign up"
              />
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
    marginLeft: 5
  }
})
export default signUp
