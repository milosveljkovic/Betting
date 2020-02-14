const express = require('express');
const router = express.Router();
let User = require('../models/user.model');
let Ticket = require("../models/ticket.model");
let Match = require("../models/match.model");

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
            possible_profit: ticket.total_odd * ticket.payment,
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
                } 
                var old_wasted_credit=user.wasted_credit;
                var new_my_tickets
                console.log(old_wasted_credit);
                if(old_wasted_credit > 10000){
                       new_my_tickets={
                        $inc : {credit: -ticket.payment},
                        wasted_credit : 0,
                        my_tickets:[...user.my_tickets,update],
                        has_extra_credit:true
                        };
                } else {
                        new_my_tickets={
                        $inc : {credit: -ticket.payment, wasted_credit:ticket.payment},
                        my_tickets:[...user.my_tickets,update],
                    };
                }
                User.findOneAndUpdate({_id:user_id},new_my_tickets,options)
                .then((updated_user)=> res.json(updated_user))
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

// @PATH    /ticket/update
// @METHOD  POST
// @DESC    Checking if ticket is winning or not 
router.post('/update',
(req,res) => {
        var winning_ticket = true;
        Ticket.findById(req.body._id)
        .then(ticket => {
            ticket.matches.map((match) => {
                Match.findById(match.match_id)
                .then(
                    match_info => {
                        if(((match_info.team1_score <= match_info.team2_score) && match.odds[0].final_score=="1") || 
                            ((match_info.team1_score != match_info.team2_score) && match.odds[0].final_score=="X") ||
                            ((match_info.team1_score >= match_info.team2_score) && match.odds[0].final_score=="2"))
                        {
                            winning_ticket = false;
                        }
                    }
                )
            });
        });
        setTimeout(function() {

            const options = {
                new : true
            }

            if(winning_ticket == true)
            {
                const update = {
                    is_winning_ticket : true
                }

                Ticket.findByIdAndUpdate(req.body._id,update,options)
                .then((ticket)=> {
                    User.findByIdAndUpdate({_id:req.body.user_id}, { $inc : {credit: ticket.possible_profit} }, options)
                    .then(user => res.json({user: user, ticket: ticket})).catch(err => res.json(err));
                })
                .catch(err=>res.status(400).json(err))

                }
            else {
                const update = {
                    is_winning_ticket : false
                }

                Ticket.findByIdAndUpdate(req.body._id,update, options)
                .then((ticket)=> {
                    User.findById({_id:req.body.user_id},{}, options)
                    .then(user => res.json({user: user, ticket: ticket})).catch(err => res.json(err));
                })
                .catch(err=>res.status(400).json(err))
            }
        },2000)
    }
)


// @PATH    /ticket/top-tickets
// @METHOD  GET
// @DESC    Get best winning tickets
router.get('/top-tickets',
    (req,res) => {
        Ticket.find({is_winning_ticket: true}).sort({possible_profit : -1})
        .then(tickets => res.json(tickets));
    }
)

// @PATH    /ticket/statistics
// @METHOD  GET
// @DESC    Get ticket for statistic
router.get('/statistics',(req,res) => {
    Ticket.find({ is_winning_ticket:[true,false]})
    .sort({ date:'asc' })
    .then(tickets => {
       var win_tickets=[],loss_ticket=[];
       var i=0;
       for( i ; i < tickets.length ; i++){
           if(tickets[i].is_winning_ticket===true){
                win_tickets.push(tickets[i])
           }else {
                loss_ticket.push(tickets[i])
           }
       }
       var ticket_statistics={
            win_tickets:win_tickets,
            loss_ticket:loss_ticket
       }
       res.json(ticket_statistics)
    })
    .catch(err=>res.status(400).json('Ticket not found: Error'+err))
    }

)

module.exports = router;