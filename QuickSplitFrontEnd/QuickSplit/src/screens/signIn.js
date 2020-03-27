import React, {useState, useContext, useEffect} from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
// import RegisterComponent from '../components/RegisterComponent'
import {Context as authContext} from '../Context/authContext';
import {NavigationEvents} from 'react-navigation';
import { ApplicationProvider, Layout, Input, Text, Button} from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import NavLink from '../components/NavLink';
import { LinearGradient } from 'expo-linear-gradient';

const signIn = ({navigation}) => {
  const {state, signin, trySignin} = useContext(authContext)
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  useEffect(() => {
    trySignin()
  }, [])
  return (
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
            <LinearGradient
              colors={['rgba(0,0,0,0.8)', 'transparent']}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: 300,
              }}
            />
          <Layout style={styles.container}>
              <Image
                  source={require('../images/quicksplitlogo.png')}
                  style={styles.image}
                />
          <Input
            style={styles.input}
            placeholder= "Username"
            value= {user}
            onChangeText={(user) => setUser(user)}
            />
          <Input
            style={styles.input}
            placeholder= "Password"
            secureTextEntry={true}
            value = {pass}
            onChangeText={(pass) => setPass(pass)}
            />
              <Button
                  style={styles.button}
                appearance='outline'
                onPress={()=> signin({user, pass})}
                >
                Submit
            </Button>
              <Text style={styles.invalid}>{state.invalid}</Text>
            </Layout>
            <NavLink
                routeName="signup"
                text="Dont have an account? Sign up"
              />
        </ApplicationProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#96bfff',
    paddingTop: 300
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 30,
    alignItems: 'center',
    flexDirection:'row'
  },
  button: {
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10
  },
  text:{
    padding: 10,
    marginBottom: 15
  },
  invalid: {
    color: 'black'
  },
  input: {
    padding: 5,
    height: 40,
    marginBottom: 15,
    paddingVertical: 10,
    marginLeft: 5,
    borderRadius: 20
  }
})
export default signIn;
