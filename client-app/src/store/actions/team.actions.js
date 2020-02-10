import { getTeamById } from "../services/service.team";
import { unsetLoading } from "./loading-indicator.actions";

export const GET_TEAM = 'GET_TEAM';
export const GET_TEAM_SUCCESS = 'GET_TEAM_SUCCESS';

export function getTeam(id){
    return{
        type: GET_TEAM,
        id: id
    }
}

export function getTeamSuccess(team){
    return{
        type: GET_TEAM_SUCCESS,
        team: team
    }
}

export const thunk_action_getTeam = team_id => {
    return function(dispatch, getState) {
      return getTeamById(team_id)
            .then(response=>{
                if(response.status===200){
                    dispatch(unsetLoading())
                    dispatch(getTeamSuccess(response.data))
                }else{
                    dispatch(unsetLoading())
                }
      })
    }
  }