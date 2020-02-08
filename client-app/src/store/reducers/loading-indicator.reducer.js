import {SET_LOADING,UNSET_LOADING} from '../actions/loading-indicator.actions'

const initialState = false

export function loadingIndicatorReducer(state=initialState,action){
    switch(action.type){
        case SET_LOADING:
            return true
        case UNSET_LOADING:
            return false   
        default:
            return state;
    }
}