import { GET_DATA_FOR_STATISTICS } from "../actions/statistics.actions";

const initialState = {
    win_tickets:[],
    loss_ticket:[]
}

export function statisticsReducer(state = initialState, action){
    switch(action.type) {
        case GET_DATA_FOR_STATISTICS:
            var statistics = (action.statistics);
            return {...statistics};
        default:
            return state;
    }
}