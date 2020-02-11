import {unsetLoading} from './loading-indicator.actions'
import {playTicketService} from '../services/service.ticket'
import {updateUsersTickets} from './user.actions'

export const ADD_MATCH_TO_CURRENTTICKET='ADD_MATCH_TO_CURRENTTICKET';
export const REMOVE_MATCH_FROM_CURRENTTICKET='REMOVE_MATCH_FROM_CURRENTTICKET'
export const PLAY_TICKET_SUCCESS='PLAY_TICKET_SUCCESS'
export const PLAY_TICKET_UNSUCCESS='PLAY_TICKET_UNSUCCESS'

export function addMatchToCurrentTicket(match){
    return{
        type: ADD_MATCH_TO_CURRENTTICKET,
        match
    }
}

export function removeMatchFromCurrentTicket(match_id){
    return{
        type: REMOVE_MATCH_FROM_CURRENTTICKET,
        match_id
    }
}

export function playTicketSuccess(){
    return{
        type: PLAY_TICKET_SUCCESS
    }
}

export function playTicketUnsuccess(){
    return{
        type: PLAY_TICKET_UNSUCCESS
    }
}

export const thunk_action_playTicket = ticket => {
    return function(dispatch, getState) {
      return playTicketService(ticket)
            .then(response=>{
                if(response.status===200){
                    dispatch(unsetLoading())
                    dispatch(playTicketSuccess())
                    dispatch(updateUsersTickets(response.data))
                 }else {
                     dispatch(unsetLoading())
                     dispatch(playTicketUnsuccess())
                 }
      })
    }
  }