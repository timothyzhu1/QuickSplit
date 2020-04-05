import context from './contexts'
import { AsyncStorage} from 'react-native';
import api from '../api/qsApi'
import {NavigationEvents} from 'react-navigation'
import {navigate} from '../navigationRef'

const authReducer = (state, action) => {
  switch(action.type){
    case 'signin':
      return {errorMessage: '', user: action.payload.user, pass: action.payload.pass}
    case 'signup':
      return {errorMessage: '', user: action.payload.user, pass: action.payload.pass}
    case 'invalid':
      return {...state, invalid: action.payload}
    case 'signout':
      return {user:null, pass:null}
    default:
      return state
  }
}

const trySignin = dispatch => async () => {
  const user = await AsyncStorage.getItem('user');
  const pass = await AsyncStorage.getItem('pass');
  if(user && pass){
    dispatch({type: 'signin', payload: user, pass})
    navigate('groupList')
  }
  else{
    navigate('login');
  }
}

const signin = (dispatch) => {
  return async({user, pass}) => {
    try{
        console.log("signin called, user: " + user + "pass: " + pass);
      const response = await api.get(`/signIn/${user}/${pass}/`);
      if(response.data.Worked == 'N'){
        dispatch({type: 'invalid', payload: 'Incorrect Credentials'})
      }
      else{
          await AsyncStorage.setItem('user', user);
          await AsyncStorage.setItem('pass', pass);
          dispatch({type: 'signin', payload: user, pass})
          navigate('groupList')
      }

    }
    catch(err){
      console.log(err);
      dispatch({type: 'invalid', payload: 'Something went wrong'})
    }
  }
}

  const signup = (dispatch) => {
    return async ({user, pass, fullName}) => {
      try{
        const response = await api.get(`/signUp/${user}/${pass}/${fullName}`)
        if(response.data.Worked == 'N'){
          dispatch({type: 'invalid', payload: 'The username or password has already been taken'})
        }
        else{
          await AsyncStorage.setItem('user', user);
          await AsyncStorage.setItem('pass', pass);
          dispatch({type: 'signup', payload: user, pass})
          navigate('groupList')
        }
      }
      catch(err){
        console.log(err);
        dispatch({type: 'invalid', payload: 'Something went wrong'})
      }
    }
  }
  const signout = (dispatch) => async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('pass');
    dispatch({ type: 'signout'});
    navigate('signin');

  }

export const {Provider, Context} = context(
  authReducer,
  {signin, signup, signout, trySignin},
   { user: null, pass: null, invalid: ''}
)
