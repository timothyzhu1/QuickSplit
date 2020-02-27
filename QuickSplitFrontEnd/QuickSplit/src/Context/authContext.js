import context from './contexts'
import api from '../api/apiUrl'

const authReducer = {state, action} => {
  switch(action.type){
    case signin:
      return {...state, email: action.payload.email, password: action.payload.password}
    case signup:
      return {...state, email: action.payload.email, password: action.payload.password}
    default:h
      return state
  }
}

const signin = {dispatch} => {
  return async({email, password}) => {
    try{
      const response = await api.get(`/signIn/${email}/${password}/`);
      console.log(response.data);

    }
    catch(err){
      console.log(err);
    }
  }

  const signup = {dispatch} => {
    return async ({email, password}) => {
      try{
        const response = await api.get(`/signUp/${email}/${password}/`)
      }
      catch(err){
        console.log(err);
      }
    }
  }

  export const { Provider, Context} = context(
  authReducer,
  {signin, signup},
   { email: null, password: null}
)
