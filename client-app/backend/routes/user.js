const router = require('express').Router();
let User_ = require('../models/user.model');

//@PATH /user
//@METHOD GET
router.route('/').get((req,res)=>{
    User_.find()
    .then(users=>res.json(users))
    .catch(err=>res.status(400).json('Error'+err))
})

//@PATH /user/add
//@METHOD POST
router.route('/add').post((req,res)=>{
    const username=req.body.username;
    const newUser = new User_({username})

    newUser.save()
    .then(()=>res.json(newUser))
    .catch(err=>res.status(400).json('Error'+err))
})

module.exports=router;