import axios from 'axios';
import { POST, URL }from '../constants'

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

export function loginUserService(credentials){
    var options = {
        data: credentials
    };

    var config = generateRequest(POST, 'user/login' , options, {});
    return axios(config)
    .then( response => response)
    .catch((errorMessage) => {
        return errorMessage
    });
}