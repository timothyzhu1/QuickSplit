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
    case 'noAdd':
      return {...state, noAdd: action.payload}
    default:
      return state
  }
}

const itemList = (dispatch) => {
  return async() => {
    try{
      const user = await AsyncStorage.getItem('user');
      const groupName = await AsyncStorage.getItem('groupName');
      const response = await api.get(`/getGroupID/${user}/${groupName}/`);
      dispatch({type:'groupID', payload: response.data.groupID})
      await AsyncStorage.setItem('groupID', response.data.groupID);
      const itemResponse = await api.get(`/getItems/${response.data.groupID}`)
      dispatch({type:'items', payload: itemResponse.data.items})
    }
    catch(err){
      console.log(err)

  }
}
}

const retMembers = (dispatch) => {
  return async() => {
    try{
      const groupID = await AsyncStorage.getItem('groupID');
      const response = await api.get(`/getGroupMembers/${groupID}/`);
      dispatch({type:'retMembers', payload: response.data.groupMembers})
    }
    catch(err){
      console.log(err)
    }
  }
}

const addGroup = (dispatch) => {
  return async({group}) => {
    try{
      const user = await AsyncStorage.getItem('user')
      console.log(user, group)
      const response = await api.get(`/joinGroup/${user}/${group}/`)
      if(response.data.Worked == 'N'){
        dispatch({type:'noAdd', payload: 'You are already in that group'})
      }
      else if(response.data.Worked == 'Y'){
        navigate('groupList')
      }
      else if(response.data.Worked == 'D'){
        dispatch({type:'noAdd', payload: 'This group does not exist'})
      }
      else {
        dispatch({type:'noAdd', payload: 'There was an error adding this group'})
      }

    }
    catch(err){
      console.log(err)
    }
  }
}

export const { Provider, Context} = context(
  itemReducer,
  {itemList, retMembers, addGroup},
  { groupID:null, items:[], members:[], noAdd:''}
)
