const router = require('express').Router();
let User_ = require('../models/user.model');

//@PATH     /user
//@METHOD   GET
//@DESC     find user by _id
router.route('/').get((req,res)=>{
    User_.findById(req.body._id)
    .then(user=>res.json(user))
    .catch(err=>res.status(400).json('User not found: Error'+err))
})

//@PATH     /user/add
//@METHOD   POST
//@DESC     add new user (Registration)
router.route('/add').post((req,res)=>{
    const newUser = new User_(req.body);
    const email = newUser.email;
    User_.findOne({email:email})
    .then(user=>{
        console.log(user);
        if(!user) //user doesnt exits
        {   //create new user
            newUser.save()
            .then(()=>res.json(200).json('You are successfully registerd.'))
            .catch(err=>res.status(400).json(err))
        }else {
            res.status(400).json('Registration failed. User with this email already exist. Try again.')
        }
    }
    )
    .catch(err=>res.status(400).json(err))
})

//@PATH     /user/login
//@METHOD   POST
//@DESC     check if user is in the db
router.route('/login').post((req,res)=>{
    const email=req.body.email;
    const pass=req.body.password;
    User_.findOne({email:email})
    .then(user=>{
        if(user!==null){
            if(user.password===pass){
                res.json(user);
            }else{
                res.status(404).json("User with this email or password doesn't exist")
            }
        }
        else{
            res.status(404).json("User with this email or password doesn't exist")
        }
    })             
    .catch(err=>res.status(400).json(err))
})

function addTicketToMyTickets () {

}

module.exports=router;