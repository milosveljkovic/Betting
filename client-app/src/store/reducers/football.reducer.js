import {GET_FOOTBALL_MATCHES_SUCCESS,CHANGE_MATCH_INCLUDED_ODD_FOOTBALL} from '../actions/match.actions';

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
        case CHANGE_MATCH_INCLUDED_ODD_FOOTBALL:
            var football_match=(action.football_match);
            state.map(match=>{
                if(match._id===football_match._id){
                    match=football_match;
                }
            })
            return [...state]
        default:
            return state;
    }
}