import { URL ,GET } from '../constants'
import axios from 'axios';

export function generateRequest(method, url, options={}, headers={}) {
    return {
        method: method,
        url: `${URL}/${url}`,
        headers: {
            'Content-Type':'application/json',
            ...headers
        },
        ...options
    }
}

export function getStatisticsDataService (){
    var config = generateRequest(GET, `ticket/statistics` , {}, {});
    return axios(config)
    .then( response => response)
    .catch((errorMessage) => {
        return errorMessage
    });
}