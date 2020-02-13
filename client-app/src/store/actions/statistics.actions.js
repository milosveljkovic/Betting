import {getStatisticsDataService} from '../services/service.statistics'
import {unsetLoading} from './loading-indicator.actions'

export const GET_DATA_FOR_STATISTICS='GET_DATA_FOR_STATISTICS';

export function getDataForStatistics(statistics){
    return {
        type: GET_DATA_FOR_STATISTICS,
        statistics
    }
}


export const thunk_action_getDataForStatistics = () => {
    return function(dispatch, getState) {
      return getStatisticsDataService()
            .then(response=>{
                if(response.status===200){
                    dispatch(unsetLoading())
                    dispatch(getDataForStatistics(response.data))
                }else{
                    dispatch(unsetLoading())
                 }
      })
    }
  }