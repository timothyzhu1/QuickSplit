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

export const { Provider, Context} = context(
  itemReducer,
  {itemList},
  { groupCode:null, items:[]}
)
