import React, {useState, useContext, useEffect} from 'react';
import { View, StyleSheet, TextInput, Button, Text, TouchableOpacity, Modal } from 'react-native';
import {Context as modalContext} from '../Context/modalContext';
import {Context as groupContext} from '../Context/groupContext';
import { Entypo, Ionicons } from '@expo/vector-icons';

const JoinGroupModal = () => {
    const ModalStateObj = useContext(modalContext);
    //const {state, getgroupNames, joinGroup, createGroup, deleteGroup, getPersonName} = useContext(groupContext);
    const GroupStateObj = useContext(groupContext);
    const [groupCode, setGroupCode] = useState('');
    const [newGroupName, setnewgroupName] = useState('');
    return (
        <View>


            <View style={styles.centeredView}>
                <Modal
                    visible={ModalStateObj.state.modal1Active}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity
                                onPress={() => ModalStateObj.setModal1State()}
                                style={styles.exit}>
                                <Entypo name="circle-with-cross" size={40} color="black"/>
                            </TouchableOpacity>
                            <Text style={styles.title}>Enter the Group Code Here</Text>
                            <TextInput
                                placeholder="Enter code here"
                                onChangeText={(groupCode) => setGroupCode(groupCode)}
                                style={styles.input}
                            />
                            <TouchableOpacity
                            onPress={() => GroupStateObj.joinGroup({groupCode})}
                            style={styles.button}
                            >
                                <Text
                                style={styles.text}
                                >Join Group</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() =>
                                    {ModalStateObj.setModal1State(),
                                    ModalStateObj.setModal2State()}
                                    }
                                >
                                <Text
                                style={styles.switch}
                                >Don't have a group? Create a group here</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>

            <View style={styles.centeredView}>
                <Modal
                    visible={ModalStateObj.state.modal2Active}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity
                                onPress={() => ModalStateObj.setModal2State()}
                                style={styles.exit}>
                                <Entypo name="circle-with-cross" size={40} color="black"/>
                            </TouchableOpacity>
                            <Text style={styles.title}>Enter Your Group's Name</Text>
                            <TextInput
                                placeholder="Group Name"
                                onChangeText={(newGroupName) => setnewgroupName(newGroupName)}
                                style={styles.input}
                            />
                            <TouchableOpacity
                            onPress={() => GroupStateObj.createGroup(newGroupName)}
                            style={styles.button}
                            >
                                <Text
                                style={styles.text}
                                >Create Group</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() =>
                                    {ModalStateObj.setModal1State(),
                                    ModalStateObj.setModal2State()}
                                    }
                                >
                                <Text
                                style={styles.switch}
                                >Already have a group? Join a Group Here</Text>

                        </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>


        </View>

    );
}
//ss


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    exit: {
      alignSelf: 'flex-end',
      right: 10
    },
    modalView: {
      margin: 20,
      alignItems: 'center',
      width: 300,
      height: 300,
      backgroundColor: "white",
      borderRadius: 20,
      //padding: 35,
      shadowColor: "#2bcf3e",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    title: {
      fontSize: 24,
      fontFamily: 'Kohinoor Bangla',
      paddingTop: 10
    },
    text: {
      fontSize: 24,
      fontFamily: 'Kohinoor Bangla',
    },
    input: {
      height: 50,
      width: 250,
      fontSize: 25,
      borderWidth: 3,
      color: 'black',
      borderRadius: 9,
      marginTop: 10
    },
    button: {
      height: 40,
      width: 200,
      marginTop: 20,
      backgroundColor: '#28c716',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center'
    },
    switch: {
      paddingTop: 10,
      fontFamily: 'Kohinoor Bangla',
      color: 'blue'
    }

});
export default JoinGroupModal;
