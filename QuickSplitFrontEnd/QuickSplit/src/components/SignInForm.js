import React from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Feather, MaterialCommunityIcons} from '@expo/vector-icons';

const SignInForm = ({value1, onChangeTextCallback1, value2, onChangeTextCallback2, submitCallback}) => {
/*
Icon, placeholderText, value, onChangeTextCallback
<TextInput
    style={styles.input}
    value={value}
    placeholder={placeholderText}
    onChangeText={(newValue) => onChangeTextCallback(newValue)}

/>
*/
    return (
        <View style={styles.container}>

            <View style={styles.background}>
                <Feather name="user" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    value={value1}
                    onChangeText={(newValue) => onChangeTextCallback1(newValue)}
                    placeholder="Username"
                    autoCapitalize="none"
                    autoCompleteType="off"
                    autoCorrect={false}
                />
            </View>

            <View style={styles.background}>
                <MaterialCommunityIcons name="lock-outline" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    value={value2}
                    onChangeText={(newValue) => onChangeTextCallback2(newValue)}
                    placeholder="Password"
                    autoCapitalize="none"
                    autoCompleteType="off"
                    autoCorrect={false}
                />
            </View>

                <View style={styles.background2}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=> submitCallback}
                    >
                        <Text style={styles.signIn}>Sign In</Text>
                    </TouchableOpacity>
                </View>

        </View>

    );
};


const styles = StyleSheet.create({
    container: {
        //flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    button: {
        flex: 1
    },
    background: {
        flexDirection: 'row',
        borderColor: 'white',
        height: 50,
        marginHorizontal: 15,
        marginVertical: 10,
        borderRadius: 20,
        borderWidth: 2
    },
    background2: {
        flexDirection: 'row',
        borderColor: 'white',
        height: 50,
        marginHorizontal: 15,
        marginVertical: 50,
        borderRadius: 20,
        borderWidth: 2
    },
    icon: {
        fontSize: 30,
        alignSelf: 'center',
        marginHorizontal: 15
    },
    input: {
        flex: 1,
        fontSize: 18,
    },
    signIn: {
        flex: 1,
        fontSize: 20,
        marginVertical: 7,
        alignSelf: 'center',
        color: 'white',
        fontFamily: 'Kohinoor Bangla'
    },

});
export default SignInForm;
