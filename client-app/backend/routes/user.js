const router = require('express').Router();
let User_ = require('../models/user.model');

//@PATH     /user
//@METHOD   GET
//@DESC     find user by _id
router.route('/').get((req,res)=>{
    User_.findById(req.body._id)
    .then(users=>res.json(users))
    .catch(err=>res.status(400).json('User not found: Error'+err))
})

//@PATH     /user/add
//@METHOD   POST
//@DESC     add new user
router.route('/add').post((req,res)=>{
    const newUser = new User_(req.body);
    newUser.save()
    .then(()=>res.json(200).json('You are successfully registerd.'))
    .catch(err=>res.status(400).json(err))
})

module.exports=router;