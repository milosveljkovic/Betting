import {GET_FOOTBALL_MATCHES_SUCCESS,} from '../actions/match.actions';

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


export function footballReducer(state=initialState,action){
    switch(action.type){
        case GET_FOOTBALL_MATCHES_SUCCESS:
            var football_matches =(action.football_matches)
            return football_matches   
        default:
            return state;
    }
}