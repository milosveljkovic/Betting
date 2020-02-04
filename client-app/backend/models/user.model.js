const mongoose_ = require('mongoose');
const Schema= mongoose_.Schema;

const UserSchema=new Schema({
    username:{
        type:String,
        minlength:3
    }
})

const User = mongoose_.model('User',UserSchema);
module.exports=User;