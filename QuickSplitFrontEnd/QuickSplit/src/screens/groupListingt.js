import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { ApplicationProvider, Layout, Button, Input } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';

const groupList = ({initalValues, onClick}) => {
  const groupLists = async({username}) => {
    const request = await api.get(`/getGroupNames/tpzhu`)
    console.log(request.data);
  }
  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <Layout style={styles.container}>
        <Text>
          These are your Groups:
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
export default groupList
