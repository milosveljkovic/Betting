import {combineReducers} from "redux";
import {userReducer} from './user.reducer'
import {loadingIndicatorReducer} from './loading-indicator.reducer'


 const rootReducer = combineReducers({
    current_user:userReducer,
    loading_indicator:loadingIndicatorReducer
})

export default rootReducer;