const express = require('express');
const router = express.Router();

let Match = require("../models/match.model");

// @path /match
// @method POST
// @desc Add a match

router.post('/',
    (req,res) => {
        var newMatch = new Match({
            team1: req.body.team1,
            team2: req.body.team2,
            team1score: req.body.team1score,
            team2score: req.body.team2score,
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