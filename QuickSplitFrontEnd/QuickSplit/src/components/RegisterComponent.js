import React, {useState} from 'react';
import { View, StyleSheet, TextInput,  Button} from 'react-native';
import { ApplicationProvider, Layout, Input, Text} from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';


const signIn = ({initalValues, onClick}) => {
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
            onPress={()=>{
            }}/>

        </Layout>
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
  input: {
    flexDirection: 'column',
    padding: 5,
    marginLeft: 5
  }
})
export default signIn
