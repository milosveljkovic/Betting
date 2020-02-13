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
// @METHOD  GET
// @DESC    Update match(add score to team1 and team2)
router.get('/update',(req,res) => {
    Match.find()
    .then((allMatches) => {
        for(let i = 0; i < allMatches.length; i++){
            const sport = allMatches[i].sport;
            let random_score_1;
            let random_score_2;
            if(sport === 'football'){
                random_score_1=Math.floor(Math.random() * 4);
                random_score_2=Math.floor(Math.random() * 4);
            }
            else{
                random_score_1=Math.floor(Math.random() * 100) + 50;
                random_score_2=Math.floor(Math.random() * 100) + 50;
            }
            const update = {
                generated_score:true,
                team1_score:random_score_1,
                team2_score:random_score_2
            }
            const options = {
                new : true
            } //return new object
            Match.findByIdAndUpdate({_id:allMatches[i]._id}, update, options)
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
                //res.json(updated_match);
            })
            .catch(err=>res.status(400).json(err))
            //.catch(err => {console.log(err)})
        }
    })
    .then(result => {
        res.status(200).json("Results generated");
    })
    .catch(err => res.status(400).json(err));
}
)

// @PATH  /match/refresh
// METHOD GET
router.get('/refresh', (req, res) => {
    const options = {
        new : true
    }
    // const odd1 = Number.parseFloat(Math.random().toPrecision(2)) * 2 + 1;
    // const odd2 = Number.parseFloat(Math.random().toPrecision(2)) * 2 + 1;
    // const oddX = Number.parseFloat(Math.random().toPrecision(2)) * 2 + 1;
    const update = {
        generated_score:false,
        team1_score:-1,
        team2_score:-1,
        // odds : [
        //     {
        //         odd: odd1,
        //         final_score: "1",
        //         // included_odds : false
        //     },
        //     {
        //         odd:  oddX,
        //         final_score: "X",
        //         // included_odds : false
        //     },
        //     {
        //         odd:  odd2,
        //         final_score: "2",
        //         // included_odds : false
        //     }
        // ]
    }
    Match.updateMany({generated_score: true}, update)
    .then((allMatches) => {
        res.status(200).json("Refreshed");
    })
    .catch(err => res.status(400).json(err))
})

// @PATH    /match
// @METHOD  GET
// @DESC    get all match with specific sport

router.get('/',(req,res) => {
    const sport_type=req.query.sport;
    Match.find({sport:sport_type})
    .then((matches=>res.json(matches)))
    .catch(err=>res.status(400).json(err))
}
)

module.exports = router;