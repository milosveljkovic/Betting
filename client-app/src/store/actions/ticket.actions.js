import { unsetLoading } from "./loading-indicator.actions";
import { getTicketById } from "../services/service.ticket";

export const GET_TICKET = 'GET_TICKET';
export const GET_TICKET_SUCCESS = 'GET_TICKET_SUCCESS';

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