import { unsetLoading } from "./loading-indicator.actions";
import { getTopTicketsService } from "../services/service.ticket";

export const GET_TOP_TICKETS = 'GET_TOP_TICKETS';


export function getTopTickets(top_tickets){
    return {
        type: GET_TOP_TICKETS,
        top_tickets : top_tickets
    }
}

export const thunk_action_getTopTickets = () => {
    return function(dispatch, getState) {
      return getTopTicketsService()
            .then(response=>{
                if(response.status===200){
                    dispatch(unsetLoading())
                    dispatch(getTopTickets(response.data))
                
                 }else{
                    dispatch(unsetLoading())
                 }
      })
    }
  }
