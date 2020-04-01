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
                            <Text>Enter the Group Code Here</Text>
                            <TextInput
                                placeholder="Enter code here"
                                onChangeText={(groupCode) => setGroupCode(groupCode)}
                            >
                            </TextInput>
                            <TouchableOpacity
                                onPress={() => ModalStateObj.setModal1State()}>
                                <Entypo name="circle-with-cross" size={50} color="black"/>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => GroupStateObj.joinGroup({groupCode})}>
                                <Text>Join Group</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() =>
                                    {ModalStateObj.setModal1State(),
                                    ModalStateObj.setModal2State()}
                                    }
                                >
                                <Text>Create a group here</Text>

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
                    <View styles={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text>Enter the Name of your Group</Text>
                            <TextInput
                                placeholder="Enter Name here"
                                onChangeText={(newGroupName) => setnewgroupName(newGroupName)}
                            >
                            </TextInput>
                            <Text>{groupCode}</Text>

                            <TouchableOpacity onPress={() => ModalStateObj.setModal2State()}>
                                <Entypo name="circle-with-cross" size={50} color="black" style={styles.add}/>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => GroupStateObj.createGroup({newGroupName})}>
                                <Text>Create Group</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    {ModalStateObj.setModal2State(),
                                    ModalStateObj.setModal1State()}
                                    }
                                >
                                <Text>Join a group here</Text>
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
    modalView: {
      margin: 20,
      alignItems: 'center',
      width: 300,
      height: 300,
      backgroundColor: "white",
      borderRadius: 20,
      //padding: 35,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },

});
export default JoinGroupModal;
