import { GET_TEAM_SUCCESS } from "../actions/team.actions";

const initialState = {
    _id: '',
    name: '',
    sport: '',
    logo_url: '',
    number_of_wins : '',
    number_of_losses : '',
    number_of_draws : ''
}

export function teamReducer(state = initialState, action){
    switch(action.type) {
        case GET_TEAM_SUCCESS:
            var team = (action.team);
            return team;
        default:
            return state;
    }
}