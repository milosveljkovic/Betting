const express = require('express');
const router = express.Router();

let Ticket = require("../models/ticket.model");

// @path /match
// @method POST
// @desc Add a match

router.post('/',
    (req,res) => {
        var latestDate = req.body.matches.map((e) => 
        { return e.date_of_match; })
        .sort().reverse()[0];

        var newTicket = new Ticket({
            code: req.body.code,
            date: req.body.date,
            matches : req.body.matches,
            payment: req.body.payment,
            total_odd: req.body.total_odd,
            possible_profit: req.body.possible_profit,
            check_date: latestDate

        });
        newTicket.save()
        .then(()=> res.json(newTicket))
        .catch(err=>res.status(400).json(err))
    }

)

module.exports = router;