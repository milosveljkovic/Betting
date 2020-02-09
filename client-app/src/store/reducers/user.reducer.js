import {LOGIN_SUCCESS, LOGIN_UNSUCCESS } from '../actions/user.actions';

const initialState={
    _id:'',
    username:'',
    email:'',
    age:'',
    credit:'',
    is_admin:null,
    my_tickets:[]
}


export function userReducer(state=initialState,action){
    switch(action.type){
        // case GET_USER_SUCCESS_AUTH:
        //     var cur_user =(action.user)
        //     return cur_user
        case LOGIN_SUCCESS:
            var user =(action.user)
            return user
        case LOGIN_UNSUCCESS:
            return null
        // case LOGOUT:
        //     return {...initialState}    
        default:
            return state;
    }
}