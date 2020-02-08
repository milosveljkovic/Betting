const express = require('express');
const router = express.Router();

let Match = require("../models/match.model");

// @PATH    /match/add
// @METHOD  POST
// @DESC    Add a match

router.post('/add',(req,res) => {
        var newMatch = new Match(req.body);
        newMatch.save()
        .then(()=> res.json(newMatch))
        .catch(err=>res.status(400).json(err))
    }
)

// @PATH    /match/update
// @METHOD  POST
// @DESC    Update match(add score to team1 and team2)

router.post('/update',(req,res) => {
    const random_score_1=Math.floor(Math.random() * 4);
    const random_score_2=Math.floor(Math.random() * 4);
    const update = {
        generated_score:true,
        team1_score:random_score_1,
        team2_score:random_score_2
    }
    const options = {
        new : true
    } //return new object
    Match.findOneAndUpdate({_id:req.body._id}, update, options)
    .then((updated_match=>res.json(updated_match)))
    .catch(err=>res.status(400).json(err))
}
)

// @PATH    /match
// @METHOD  GET
// @DESC    get all match with specific sport

router.get('/',(req,res) => {
    const sport_type=req.body.sport;
    Match.find({sport:sport_type})
    .then((matches=>res.json(matches)))
    .catch(err=>res.status(400).json(err))
}
)

module.exports = router;