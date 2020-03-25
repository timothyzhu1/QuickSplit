import context from './contexts'
import api from '../api/apiUrl'
import {NavigationEvents} from 'react-navigation'
import {navigate} from '../navigationRef'
import { AsyncStorage} from 'react-native';


const groupReducer = (state, action) => {
  switch(action.type){
    case groupNames:
      return {...state,}
    case delete:
      return {...state,}
    default:
      return state
  }
}

const groupNames = {dispatch} => {
  return async() => {
    try{
      const user = await AsyncStorage.getItem('user');
      const response = await api.get(`/getGroupNames/${user}`);
      console.log(response.data)
      dispatch({type: 'groupNames', payload: response.data})
    }
    catch(err){
      console.log(err)
    }
  }
}

const addGroup = {dispatch} => {
  return async({groupCode}) => {
    try{
      const response = await api.get(`/addGroup/${email}/${groupCode}/`);
      console.log(response.data);

    }
    catch(err){
      console.log(err);
    }
  }

  const deleteGroup = {dispatch} => {
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
  {groupNames, addGruop, deleteGroup},
   { email: null, groupCode}
)
