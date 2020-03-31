import React, {useState, useContext, useEffect} from 'react';
import { View, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, Image, Text } from 'react-native';
// import RegisterComponent from '../components/RegisterComponent'
import {Context as authContext} from '../Context/authContext';
import {NavigationEvents} from 'react-navigation';
import NavLink from '../components/NavLink';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

const signIn = ({navigation}) => {
  const {state, signin, trySignin} = useContext(authContext)
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  useEffect(() => {
  }, [])
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
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  animation: {
      height: 300,
      alignSelf: 'center'
  },
  title: {
      fontFamily: 'Kohinoor Bangla',
      fontSize: 60,
      alignSelf: 'center'
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 30,
    alignItems: 'center',
    flexDirection:'row'
  },
  button: {
    height: 40,
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#28c716',
    borderRadius: 8,
    justifyContent: 'center'
  },
  invalid: {
    color: 'black'
  },
  signIn: {
      fontSize: 20,
      alignSelf: 'center',
      color: 'white',
      fontFamily: 'Kohinoor Bangla'
  },
  input: {
    padding: 10,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
    borderBottomWidth: 5,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    height: 50
  }
})
export default signIn;
