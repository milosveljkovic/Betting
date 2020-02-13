import {unsetLoading} from '../actions/loading-indicator.actions'
import {
    getMatchesBySportService,
    generateMatchesResultService,
    refreshMatchesService} 
    from '../services/service.match'

export const GET_FOOTBALL_MATCHES_SUCCESS = 'GET_FOOTBALL_MATCHES_SUCCESS';
export const GET_BASKETBALL_MATCHES_SUCCESS = 'GET_BASKETBALL_MATCHES_SUCCESS';
export const CHANGE_MATCH_INCLUDED_ODD_FOOTBALL='CHANGE_MATCH_INCLUDED_ODD_FOOTBALL';
export const CHANGE_MATCH_INCLUDED_ODD_BASKETBALL='CHANGE_MATCH_INCLUDED_ODD_BASKETBALL';

export function getFootballMatchesSuccess(football_matches){
    return {
        type: GET_FOOTBALL_MATCHES_SUCCESS,
        football_matches
    }
}

export function getBasketballMatchesSuccess(basketball_matches){
    return {
        type: GET_BASKETBALL_MATCHES_SUCCESS,
        basketball_matches
    }
}

export const thunk_action_getMatches = sport => {
    return function(dispatch, getState) {
      return getMatchesBySportService(sport)
            .then(response=>{
                if(response.status===200 && sport==='football'){
                    dispatch(unsetLoading())
                    dispatch(getFootballMatchesSuccess(response.data))
                 }else if(response.status===200 && sport==='basketball'){
                    dispatch(getBasketballMatchesSuccess(response.data))
                    dispatch(unsetLoading())
                 }else{
                    dispatch(unsetLoading())
                 }
      })
    }
  }


  export function changeMatchIncludedOddsFootball(football_match){
    return {
        type: CHANGE_MATCH_INCLUDED_ODD_FOOTBALL,
        football_match
    }
}

export function changeMatchIncludedOddsBasketball(basketball_match){
    return {
        type: CHANGE_MATCH_INCLUDED_ODD_BASKETBALL,
        basketball_match
    }
}

export const thunk_action_generateMatchResults = () => {
    return function(dispatch, getState) {
      return generateMatchesResultService()
            .then(response=>{
                if(response.status===200)
                {
                    getMatchesBySportService('football').
                    then(response => {
                        if(response.status===200)
                        {
                            dispatch(getFootballMatchesSuccess(response.data))
                            getMatchesBySportService('basketball').
                            then(response => {
                                if(response.status===200)
                                {
                                    dispatch(getBasketballMatchesSuccess(response.data))
                                    dispatch(unsetLoading())
                                }
                            })
                        }
                    })
                 }
                 else{
                    dispatch(unsetLoading())
                 }
      })
    }
  }

  export const thunk_action_refreshMatches = () => {
    return function(dispatch, getState) {
      return refreshMatchesService()
            .then(response=>{
                if(response.status===200)
                {
                    getMatchesBySportService('football').
                    then(response => {
                        if(response.status===200)
                        {
                            dispatch(getFootballMatchesSuccess(response.data))
                            getMatchesBySportService('basketball').
                            then(response => {
                                if(response.status===200)
                                {
                                    dispatch(getBasketballMatchesSuccess(response.data))
                                    dispatch(unsetLoading())
                                }
                            })
                        }
                    })
                 }
                 else{
                    dispatch(unsetLoading())
                 }
      })
    }
  }