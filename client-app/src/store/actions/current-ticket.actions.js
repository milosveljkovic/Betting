
export const ADD_MATCH_TO_CURRENTTICKET='ADD_MATCH_TO_CURRENTTICKET';
export const REMOVE_MATCH_FROM_CURRENTTICKET='REMOVE_MATCH_FROM_CURRENTTICKET'

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