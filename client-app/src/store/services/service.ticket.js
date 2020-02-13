import { URL ,POST, GET } from '../constants'
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

export function getTicketById(id){
    const _id = { _id: id} ;
    var options = {
        data: _id
    };
    var config = generateRequest(POST, 'ticket' , options, {});
    return axios(config)
    .then( response => response)
    .catch((errorMessage) => {
        return errorMessage
    });
}

export function playTicketService(ticket){
    var options = {
        data: ticket
    };
    var config = generateRequest(POST, 'ticket/add' , options, {});
    return axios(config)
    .then( response => response)
    .catch((errorMessage) => {
        return errorMessage
    });
}

export function getTopTicketsService(){

    var config = generateRequest(GET, 'ticket/top-tickets' , {}, {});
    return axios(config)
    .then( response => response)
    .catch((errorMessage) => {
        return errorMessage
    });
}

export function checkTicket(ticket_id, user_id){
    const info={ _id: ticket_id, user_id: user_id };
    var options = {
        data: info
    };
    var config = generateRequest(POST, 'ticket/update' , options, {});
    return axios(config)
    .then( response => response)
    .catch((errorMessage) => {
        return errorMessage
    });
}
