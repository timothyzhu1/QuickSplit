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
    case 'personName':
        return {...state, personName: action.payload}
      case 'noAdd':
        return {...state, noAdd: action.payload}
    default:
      return state
  }
}

const getgroupNames = (dispatch) => async() => { //retrieves the members of a certain group
    try{
      const user = await AsyncStorage.getItem('user');
      const response = await api.get(`/getGroupNames/${user}/`);
      dispatch({type:'groupNames', payload: response.data.groupNames})
    }
    catch(err){
      console.log(err);
  }
}

const getPersonName = (dispatch) => async() => { //retrieves the members of a certain group
    try{
      const user = await AsyncStorage.getItem('user');
      const response = await api.get(`/getFirstName/${user}/`);
      console.log(response.data)
    }
    catch(err){
      console.log(err);
  }
}

const joinGroup = (dispatch) => {
  return async({groupCode}) => {
    console.log(groupCode);
    try{
      const noExist = 'This Group Does not Exist. Try Again'
      const alreadyIn = 'You are Already in this Group'
      const wrong = 'Sorry, Something Went Wrong'
      const user = await AsyncStorage.getItem('user');
      const response = await api.get(`/joinGroup/${user}/${groupCode}/`)
      if(response.data.Worked == 'N'){
        dispatch({type:'noAdd', payload: alreadyIn })
      }
      else if(response.data.Worked == 'D'){
        dispatch({type:'noAdd', payload: noExist})
      }
      else if(response.data.Worked == 'F'){
        dispatch({type:'noAdd', payload: wrong})
      }
    }
    catch(err){
      console.log(err)
    }
};
}

const createGroup = (dispatch) => { //
    return async (newGroupName) => {
        console.log(newGroupName)
        try{
            const user = await AsyncStorage.getItem('user');
            const response = await api.get(`/createGroup/${user}/${newGroupName}/`);
            console.log(response.data)
        }
        catch (err) {
            console.log(err);
        }
    }
}

  const deleteGroup = (dispatch) => {
    return async (group) => {
        console.log(group)
      try{
        const user = await AsyncStorage.getItem('user');
        const groupID = await api.get(`/getGroupID/${user}/${group}/`);
        const deleteGroup = await api.get(`/leaveGroup/${user}/${100 + groupID.data.groupID}/`);
      }
      catch(err){ //still need to edit
        console.log(err);
      }
    }
  }

export const { Provider, Context} = context(
  groupReducer,
  {getgroupNames, joinGroup, deleteGroup, createGroup, getPersonName},
  {groupNames:[], personName: ''}
)
