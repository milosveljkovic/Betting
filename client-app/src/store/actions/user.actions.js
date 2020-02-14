import {loginUserService,getUserByUserIdService, addUserCreditFromBonus} from '../services/service.user'
import {unsetLoading} from '../actions/loading-indicator.actions'

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_UNSUCCESS = "LOGIN_UNSUCCESS";
export const GET_USER_SUCCESS_AUTH = 'GET_USER_SUCCESS_AUTH';
export const UPDATE_USER_TICKETS='UPDATE_USER_TICKETS';
export const UPDATE_USER_CREDIT='UPDATE_USER_CREDIT';
export const PAY_FOR_TICKET='PAY_FOR_TICKET';

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

  export function getUserByIdAuth (user) {
    return {
        type:GET_USER_SUCCESS_AUTH,
        user
    }
}

  export const thunk_action_getUserByIdAuth = userID => {
    return function(dispatch, getState) {
      return getUserByUserIdService(userID).then(response=>{
          if(response.status===200){
              dispatch(getUserByIdAuth(response.data))
          }
      })
    }
  }

  export function updateUsersTickets (updated_user) {
    return {
        type:UPDATE_USER_TICKETS,
        updated_user
    }
  }

  export function updateUserCredit(user) {
    return {
      type:UPDATE_USER_CREDIT,
      user
  }
}

  export function payForTicket(payment){
    return {
      type:PAY_FOR_TICKET,
      payment
  }
  }

  export const thunk_action_extraCredit = email => {
    return function(dispatch, getState) {
      return addUserCreditFromBonus(email)
      .then(response=>{
          if(response.status===200){
              dispatch(updateUserCredit(response.data))
          }
      })
    }
  }