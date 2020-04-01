import React, {useState, useContext, useEffect} from 'react';
import context from './contexts';
import api from '../api/qsApi';
import {NavigationEvents} from 'react-navigation'
import {navigate} from '../navigationRef';
import { AsyncStorage} from 'react-native';


const modalReducer = (state, action) => {
  switch(action.type){
      case 'm1':
        return {...state, modal1Active: !state.modal1Active};
    case 'm2':
        return {...state, modal2Active: !state.modal2Active};
    default:
      return state;
  }
}

const setModal1State = (dispatch) => {
    return () => {
        dispatch({type: 'm1'});
    }
};
const setModal2State = (dispatch) => {
    return () => {
        dispatch({type: "m2"});
    }
};



export const { Provider, Context} = context(
  modalReducer,
  {setModal1State, setModal2State},
  {modal1Active: false, modal2Active: false}
)
