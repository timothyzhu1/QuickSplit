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
      case 'noAdd':
        return {...state, noAdd: action.payload}
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
  return async({group}) => {
    try{
      const user = await AsyncStorage.getItem('user')
      console.log(user, group)
      const response = await api.get(`/joinGroup/${user}/${group}/`)
      if(response.data.Worked == 'N'){
        dispatch({type:'noAdd', payload: 'You are already in that group'})
        console.log('here')
      }
      else if(response.data.Worked == 'Y'){
        console.log('1')
        navigate('groupList')
      }
      else if(response.data.Worked == 'D'){
        console.log('2')
        dispatch({type:'noAdd', payload: 'This group does not exist'})
      }
      else {
        console.log('3')
        dispatch({type:'noAdd', payload: 'There was an error adding this group'})
      }

    }
    catch(err){
      console.log(err)
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
  {groupNames, addGroup, deleteGroup},
  { groupCode:null, groupNames:[]}
)
