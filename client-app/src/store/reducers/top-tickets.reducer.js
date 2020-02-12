import { GET_TOP_TICKETS } from "../actions/top-tickets.actions";

const initialState = []

export function topTicketsReducer(state = initialState, action){
    switch(action.type){
        case GET_TOP_TICKETS:
            var top_tickets = (action.top_tickets)
            return top_tickets   
        default:
            return state;
    }
}