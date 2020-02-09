const express = require('express');
const router = express.Router();

let Team = require("../models/team.model");

//@PATH     /team/
//@METHOD   GET
//@DESC     get team by id
router.get("/", (req, res) => {
     const teamId = req.body.team_id;
     Team.findOne({_id : teamId})
     .then((team => res.json(team)))
     .catch(err => res.status(400).json(err))
})

router.post("/add", (req, res) => {
    const newTeam = Team(req.body);
    const teamName = req.body.name;
    Team.findOne({name:teamName})
    .then(team => {
        if(team){
            res.status(400).json('Team with this name alredy exists');
        }
        else{
            newTeam.save()
            .then(()=>res.json(200).json('Team successfully created.'))
            .catch(err=>res.status(400).json(err))
        }
    })
})
module.exports = router;