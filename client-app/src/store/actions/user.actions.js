import {loginUserService} from '../services/service.user'
import {unsetLoading} from '../actions/loading-indicator.actions'

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_UNSUCCESS = "LOGIN_UNSUCCESS";


export function loginSuccess(user){
    return {
        type: LOGIN_SUCCESS,
        user
    }
}

export function loginUnsuccess(){
    return {
        type: LOGIN_UNSUCCESS,
    }
}

export const thunk_action_loginWithEmailAndPass = credentials => {
    return function(dispatch, getState) {
      return loginUserService(credentials)
            .then(response=>{
                if(response.status===200){
                    localStorage.setItem('user_id',response.data._id);
                    dispatch(unsetLoading())
                    dispatch(loginSuccess(response.data))
                 }else {
                     dispatch(unsetLoading())
                     dispatch(loginUnsuccess())
                 }
      })
    }
  }