import {GET_BASKETBALL_MATCHES_SUCCESS,CHANGE_MATCH_INCLUDED_ODD_BASKETBALL} from '../actions/match.actions';

const initialState=[{
    _id:'',
    team1:{
        name:'',
        team_id:''
    },
    team2:{
        name:'',
        team_id:''
    },
    sport:'',
    date_of_match:'',
    odds:[
        {
            odd:{
                $numberDecimal:0
            },
            final_score:'',
            included_odds:null
        }
    ],
    team1_score:null,
    team2_score:null,
    generated_score:null
}
]


export function basketballReducer(state=initialState,action){
    switch(action.type){
        case GET_BASKETBALL_MATCHES_SUCCESS:
            var basketball_matches =(action.basketball_matches)
            return basketball_matches   
        case CHANGE_MATCH_INCLUDED_ODD_BASKETBALL:
            var basketball_match=(action.basketball_match);
            state.map(match=>{
                if(match._id===basketball_match._id){
                    match=basketball_match;
                }
            })
            return [...state]
        default:
            return state;
    }
}