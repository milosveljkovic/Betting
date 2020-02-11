import { REMOVE_MATCH_FROM_CURRENTTICKET,ADD_MATCH_TO_CURRENTTICKET } from "../actions/current-ticket.actions";

const initialState = {
    code: '',
    payment: '',
    total_odd : '',
    matches: []
}

export function currentTicketReducer(state = initialState, action){
    switch(action.type) {
        case ADD_MATCH_TO_CURRENTTICKET:
            var match = (action.match);
            return Object.assign({}, state, {
                matches: [...state.matches,match]
              })
        case REMOVE_MATCH_FROM_CURRENTTICKET:
            var match_id=(action.match_id);
            state.matches=state.matches.filter(match=>match.match_id!==match_id);
            return {...state}
        default:
            return state;
    }
}