import React, {useState, useContext, useEffect} from 'react';
import context from './contexts'
import api from '../api/qsApi'
import {NavigationEvents} from 'react-navigation'
import {navigate} from '../navigationRef'
import { AsyncStorage} from 'react-native';


const itemReducer = (state, action) => {
  switch(action.type){
    case 'items':
      return {...state, items: action.payload}
    case 'groupID':
      return {...state, groupID: action.payload}
    case 'retMembers':
      return {...state, members: action.payload}
    case 'valid':
      return {...state, valid: action.payload}
    case 'added':
        return {...state, added: action.payload}
    default:
      return state
  }
};

const itemList = (dispatch) => {
  return async(groupName) => {
    try{
      const user = await AsyncStorage.getItem('user');
      const response = await api.get(`/getGroupID/${user}/${groupName}/`);
      dispatch({type:'groupID', payload: response.data.groupID})
      await AsyncStorage.setItem('groupID', response.data.groupID);
      const itemResponse = await api.get(`/getItems/${response.data.groupID}`)
      dispatch({type:'items', payload: itemResponse.data.item})
    }
    catch(err){
      console.log(err)

  }
};
}

const retMembers = (dispatch) => {
  return async(groupName) => {
    try{
      const user = await AsyncStorage.getItem('user');
      const group = await api.get(`/getGroupID/${user}/${groupName}/`);
      const response = await api.get(`/getGroupMembers/${group.data.groupID}/`);
      console.log(response.data)
      dispatch({type:'retMembers', payload: response.data})
    }
    catch(err){
      console.log(err)
    }
  }
}

const addItem = (dispatch) => {
  return async({item}) => {
    try{
      const groupID = await AsyncStorage.getItem('groupID');
      const user = await AsyncStorage.getItem('user');
      console.log(100+groupID)
      const response = await api.get(`/addItem/${user}/${100+groupID}/${item}`)
      console.log(response.data)
      if(response.data.Worked == 'N'){
        dispatch({type:'valid', payload: 'item not sucesffully added'})
      }
      else{
        navigate('itemLists')
      }
    }
    catch(err){
      console.log(err)
    }
  }
}

export const { Provider, Context} = context(
  itemReducer,
  {itemList, retMembers, addItem},
  { groupID:null, items:[], members:[], valid:'', added:[]}
)
