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

export function getTeamById(id){

    var config = generateRequest(GET, `team?team_id=${id}` , {}, {});
    return axios(config)
    .then( response => response)
    .catch((errorMessage) => {
        return errorMessage
    });
}