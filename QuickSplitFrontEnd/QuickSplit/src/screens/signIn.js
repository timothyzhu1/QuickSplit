import React, {useState, useContext, useEffect} from 'react';
import { View, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, Image, Text, ImageBackground } from 'react-native';
// import RegisterComponent from '../components/RegisterComponent'
import {Context as authContext} from '../Context/authContext';
import {NavigationEvents} from 'react-navigation';
import NavLink from '../components/NavLink';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import SignInForm from '../components/SignInForm';
import {Feather, MaterialCommunityIcons} from '@expo/vector-icons';

const signIn = ({navigation}) => {
  const {state, signin, trySignin} = useContext(authContext)
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  let image;

  useEffect(() => {
  }, []);
  /*

  <TextInput
    style={styles.input1}
    placeholder= "Username"
    value= {user}
    onChangeText={(user) => setUser(user)}
    />
    */
  return (
        <View style={styles.container}>
          <Image
          source={require('../images/homescreenbgimage.png')}
          style={styles.image}
          />
              <Text style={styles.title}>QuickSplit</Text>
        <KeyboardAvoidingView
            keyboardVerticalOffset={20}
            behavior="padding"
            >
            <Image
            source={require('../images/qscartlogo.png')}
            styles={styles.logo}
            />
            <SignInForm
                value1={user}
                onChangeTextCallback1={setUser}
                value2={pass}
                onChangeTextCallback2={setPass}
                submitCallback={() => {signin(user, pass)}}
            />

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
  },
  logo: {
    width: 30,
    height: 50,
    alignSelf: 'center'
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  title: {
      fontFamily: 'Kohinoor Bangla',
      fontSize: 60,
      alignSelf: 'center',
      color: "white"
  },
  image: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  invalid: {
    color: 'black'
  },

  input1: {
    borderTopWidth: 3,
    borderRadius: 50,
    borderColor: 'white',
    marginLeft: 15,
    marginRight: 10,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    height: 50,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  input2: {
    borderRadius: 50,
    borderColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    height: 50,
    borderBottomRightRadius: 0,
    width: 380,
  },
  button: {
    borderRadius: 50,
    borderColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    height: 50
  }
})
export default signIn;
