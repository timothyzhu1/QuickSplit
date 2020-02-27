import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { ApplicationProvider, Layout, Button, Input } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';


const signIn = ({initalValues, onClick}) => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <Layout style={styles.container}>
        <Text>
          Enter Username:
        </Text>
        <Input
          style={styles.input}
          placeholder= "Username"
          value= {user}
          onChangeText={({user}) => setUser(user)}
          />
          <Text>
            Enter Password:
          </Text>
          <Input
            style={styles.input}
            placeholder= "Password"
            secureTextEntry={true}
            value = {pass}
            onChangeText={({pass}) => setPass(pass)}
            />
          <Button
            appearance="outline"
            onPress = {() => onSubmit(user, pass)}
            >
            Sign In
          </Button>
      </Layout>

    </ApplicationProvider>
)
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  input: {
    padding: 5,
    marginLeft: 5
  }
})
export default signIn
