const express = require('express');
const router = express.Router();
let User = require('../models/user.model');
let Ticket = require("../models/ticket.model");

// @PATH    /ticket/add
// @METHOD  POST
// @DESC    Add a ticket
// @RETURN  return only my_ticket for user
router.post('/add',(req,res) => {
        const ticket=req.body.ticket;
        const user_id=req.body.user_id;
        var latestDate = ticket.matches.map((match) => 
        { return match.date_of_match; }).sort().reverse()[0];

        var newTicket = new Ticket({
            ...ticket,
            check_date: latestDate
        });
        newTicket.save()
        .then((ticket)=>{ //when ticket is added, add ticket to user.
            const update = {
                ticket_id:ticket._id,
                code:ticket.code,
                possible_profit:ticket.possible_profit,
                total_odd:ticket.total_odd
            }
            User.findById(user_id)
            .then(user=>{
                const options = {
                    new : true
                } //return new object
                const new_my_tickets={my_tickets:[...user.my_tickets,update]};
                User.findOneAndUpdate({_id:user_id},new_my_tickets,options)
                .then((updated_user)=> res.json(updated_user.my_tickets))
                .catch(err=>res.status(400).json(err))
            })
            .catch(err=>res.status(400).json(err))
        })
        .catch(err=>res.status(400).json(err))
    }
)

// @PATH    /ticket
// @METHOD  POST
// @DESC    Get ticket by _id
router.post('/',(req,res) => {
    Ticket.findById(req.body._id)
    .then(ticket => res.json(ticket))
    .catch(err=>res.status(400).json('Ticket not found: Error'+err))
    }

)

module.exports = router;