import context from './contexts'
import api from '../api/apiUrl'

const groupReducer = {state, action} => {
  switch(action.type){
    case addg:
      return {...state,}
    case delete:
      return {...state,}
    default:
      return state
  }
}

const add = {dispatch} => {
  return async({username, groupCode}) => {
    try{
      const response = await api.get(`/addGroup/${email}/${groupCode}/`);
      console.log(response.data);

    }
    catch(err){
      console.log(err);
    }
  }

  const delete = {dispatch} => {
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
  authReducer,
  {add, delete},
   { email: null, groupCode}
)
