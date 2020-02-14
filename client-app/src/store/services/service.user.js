import axios from 'axios';
import { POST, URL ,GET}from '../constants'

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

export function registerNewUser (auth) {
    var options = {
        data: auth
    };

    var config = generateRequest(POST, 'user/add' , options, {});
    return axios(config)
    .then( response => response)
    .catch((errorMessage) => {
        return "Registration failed. User with this email already exist. Try again."
    });
}

export function getUserByUserIdService (userId) {
    const _id={_id:userId};
    var options = {
        data: _id
    };
    var config = generateRequest(POST, `user` ,options, {});
    return axios(config)
    .then( response => response)
    .catch((errorMessage) => {
        return errorMessage
    });
}

export function addUserCredit (email,credit) {
    const info={ email:email, credit:credit };
    var options = {
        data: info
    };
    var config = generateRequest(POST, `user/update` ,options, {});
    return axios(config)
    .then( response => response)
    .catch((errorMessage) => {
        return errorMessage
    });
}

export function addUserCreditFromBonus (email) {
    const info={ email:email };
    var options = {
        data: info
    };
    var config = generateRequest(POST, `user/update/extra-credit` ,options, {});
    return axios(config)
    .then( response => response)
    .catch((errorMessage) => {
        return errorMessage
    });
}
