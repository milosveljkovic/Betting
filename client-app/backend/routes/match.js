const express = require('express');
const router = express.Router();

let Match = require("../models/match.model");

// @path /match
// @method POST
// @desc Add a match

router.post('/',
    (req,res) => {
        var newMatch = new Match({
            title: req.body.title,
            sport: req.body.sport,
            date_of_match : req.body.date_of_match,
            odds: req.body.odds

        });
        newMatch.save()
        .then(()=> res.json(newMatch))
        .catch(err=>res.status(400).json(err))
    }

)

module.exports = router;