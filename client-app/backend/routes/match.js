const express = require('express');
const router = express.Router();

let Match = require("../models/match.model");
let Team = require("../models/team.model")
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
// @TODO    na osnovu sporta generisanje rezultata, dodati u request sport
router.post('/update',(req,res) => {
    const sport = req.body.sport;
    let random_score_1;
    let random_score_2;
    if(sport === 'football'){
        random_score_1=Math.floor(Math.random() * 4);
        random_score_2=Math.floor(Math.random() * 4);
    }
    else{
        random_score_1=Math.floor(Math.random() * 100);
        random_score_2=Math.floor(Math.random() * 100);
    }
    const update = {
        generated_score:true,
        team1_score:random_score_1,
        team2_score:random_score_2
    }
    const options = {
        new : true
    } //return new object
    Match.findByIdAndUpdate({_id:req.body._id}, update, options)
    .then((updated_match)=>{
        if(random_score_1 > random_score_2){
            Team.findByIdAndUpdate({_id:updated_match.team1.team_id}, {$inc : {'number_of_wins':1}})
            .catch(err => console.log(err))
            Team.findByIdAndUpdate({_id:updated_match.team2.team_id}, {$inc : {'number_of_losses':1}})
            .catch(err => console.log(err))
        }
        else if(random_score_2 > random_score_1){
            Team.findByIdAndUpdate({_id:updated_match.team1.team_id}, {$inc : {'number_of_losses':1}})
            .catch(err => console.log(err))
            Team.findByIdAndUpdate({_id:updated_match.team2.team_id}, {$inc : {'number_of_wins':1}})
            .catch(err => console.log(err))
        }
        else{
            Team.findByIdAndUpdate({_id:updated_match.team1.team_id}, {$inc : {'number_of_draws':1}})
            .catch(err => console.log(err))
            Team.findByIdAndUpdate({_id:updated_match.team2.team_id}, {$inc : {'number_of_draws':1}})
            .catch(err => console.log(err))
        }
        res.json(updated_match);
    })
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