import React, {useState, useContext, useEffect} from 'react';
import context from './contexts'
import api from '../api/qsApi'
import {NavigationEvents} from 'react-navigation'
import {navigate} from '../navigationRef'
import { AsyncStorage} from 'react-native';


const groupReducer = (state, action) => {
  switch(action.type){
    case 'groupNames':
      return {...state, groupNames: action.payload}
    default:
      return state
  }
}

const groupNames = (dispatch) => async() => {
    try{
      const user = await AsyncStorage.getItem('user');
      const response = await api.get(`/getGroupNames/${user}`);
      dispatch({type: 'groupNames', payload: response.data.groupNames})
    }
    catch(err){
      console.log(err)

  }
}

const addGroup = (dispatch) => {
  return async({groupCode}) => {
    try{
      const response = await api.get(`/addGroup/${email}/${groupCode}/`);
      console.log(response.data);

    }
    catch(err){
      console.log(err);
    }
  }
}

  const deleteGroup = (dispatch) => {
    return async ({email, password}) => {
      try{
        const response = await api.get(`/deleteGroup/${email}/${groupCode}/`)
      }
      catch(err){
        console.log(err);
      }
    }
  }

export const { Provider, Context} = context(
  groupReducer,
  {groupNames},
  { groupCode:null, groupNames:[]}
)
