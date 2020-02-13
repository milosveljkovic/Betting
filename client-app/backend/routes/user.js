const router = require('express').Router();
let User_ = require('../models/user.model');

const EXTRA_CREDIT=500;

//@PATH     /user
//@METHOD   GET
//@DESC     find user by _id
router.route('/').post((req,res)=>{
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

//@PATH     /user/update
//@METHOD   POST
//@DESC     add credit to profile
router.post('/update',(req,res) => {
    const newcredit = parseFloat(req.body.credit);

    const options = {
        new : true
    }

    User_.findOneAndUpdate({ email:req.body.email }, { $inc : {credit: newcredit} }, options)
    .then((user_with_updated_credit =>res.json(user_with_updated_credit)))
    .catch(err => res.status(400).json(err))
}
)

//@PATH     /update/extra-credit
//@METHOD   POST
//@DESC     add extra_credit to user
//@REQ      req.body.email
router.post('/update/extra-credit',(req,res) => {
    const extra_credit = EXTRA_CREDIT ;

    const options = {
        new : true
    }

    User_.findOneAndUpdate(
        { email:req.body.email },
        { 
            $inc : {credit: extra_credit} ,
            has_extra_credit : false
        }, 
        options)
    .then((user_with_extra_credit =>res.json(user_with_extra_credit)))
    .catch(err => res.status(400).json(err))
}
)

module.exports = router;