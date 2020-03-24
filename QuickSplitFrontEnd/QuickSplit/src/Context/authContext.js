import context from './contexts'
import { AsyncStorage} from 'react-native';
import api from '../api/qsApi'

const authReducer = (state, action) => {
  switch(action.type){
    case signin:
      return {errorMessage: '', email: action.payload.user, password: action.payload.pass}
    case signup:
      return {errorMessage: '', email: action.payload.user, password: action.payload.pass}
    case 'invalid':
      return {...state, invalid: action.payload}
    default:
      return state
  }
}

const signin = (dispatch) => {
  return async({user, pass}) => {
    try{
      const response = await api.get(`/signIn/${user}/${pass}/`);
      if(response.data.Worked == 'N'){
        dispatch({type: 'invalid', payload: 'Incorrect Credentials'})
      }
      else{
        try{
          await AsyncStorage.setItem('user', user);
          await AsyncStorage.setItem('pass', pass);
        }
        catch(err){
          console.log(err)
        }
        dispatch({type: 'signup', payload: user, pass})
      }

    }
    catch(err){
      console.log(err);
      dispatch({type: 'invalid', payload: 'Something went wrong'})
    }
  }
}

  const signup = (dispatch) => {
    return async ({user, pass}) => {
      try{
        const response = await api.get(`/signUp/${user}/${pass}/`)
        if(response.data.Worked == 'N'){
          dispatch({type: 'invalid', payload: 'The username or password has already been taken'})
        }
        else{
          await AsyncStorage.setItem('username', user);
          await AsyncStorage.setItem('password', pass);
          dispatch({type: 'signup', payload: user, pass})
        }
      }
      catch(err){
        console.log(err);
        dispatch({type: 'invalid', payload: 'Something went wrong'})
      }
    }
  }

export const {Provider, Context} = context(
  authReducer,
  {signin, signup},
   { user: null, pass: null, invalid: ''}
)
