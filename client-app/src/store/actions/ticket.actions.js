import { unsetLoading } from "./loading-indicator.actions";
import { getTicketById, checkTicket } from "../services/service.ticket";
import { updateUserCredit } from "./user.actions";

export const GET_TICKET = 'GET_TICKET';
export const GET_TICKET_SUCCESS = 'GET_TICKET_SUCCESS';
export const UPDATE_TICKET = 'UPDATE_TICKET';

export function getTeam(id){
    return{
        type: GET_TICKET,
        id: id
    }
}

export function getTicketSuccess(ticket){
    return{
        type: GET_TICKET_SUCCESS,
        ticket: ticket
    }
}

export function updateTicket(ticket) {
    return {
        type: UPDATE_TICKET,
        ticket
    }
  }

export const thunk_action_getTicket = id => {
    return function(dispatch, getState) {
      return getTicketById(id)
            .then(response=>{
                if(response.status===200){
                    dispatch(unsetLoading())
                    dispatch(getTicketSuccess(response.data))
                }else{
                    dispatch(unsetLoading())
                }
      })
    }
  }

  export const thunk_action_updateIfIsWinning = (ticket_id, user_id) => {
    return function(dispatch, getState) {
      return checkTicket(ticket_id, user_id)
            .then(response=>{
                console.log(response.data)
                if(response.status===200){
                    dispatch(unsetLoading())
                    dispatch(updateUserCredit(response.data.user))
                    dispatch(updateTicket(response.data.ticket))
                 }else {
                     dispatch(unsetLoading())
                     dispatch(updateTicket(response.data.ticket))
                 }
      })
    }
  }