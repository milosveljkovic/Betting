import { GET_TICKET_SUCCESS, UPDATE_TICKET } from "../actions/ticket.actions";

const initialState = {
    _id: '',
    code: '',
    date: '',
    payment: '',
    total_odd : '',
    possible_profit : '',
    check_date : '',
    matches: []
}

export function ticketReducer(state = initialState, action){
    switch(action.type) {
        case GET_TICKET_SUCCESS:
            var ticket = (action.ticket);
            return ticket;
        case UPDATE_TICKET:
            var ticket = (action.ticket)
            return {...ticket}
        default:
            return state;
    }
}