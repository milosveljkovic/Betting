const mongoose_ = require('mongoose');
const Schema= mongoose_.Schema;

const UserSchema=new Schema({
    username:{
        type:String,
        minlength:6,
        required: true
    },
    password:{
        type:String,
        minlength:6,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    age:{
        type:Number,
        require:true,
        min:18
    },
    credit:{
        type: mongoose_.Decimal128,
        min:0
    },
    is_admin:{
        type:Boolean,
        required:true
    }
})

const User = mongoose_.model('User',UserSchema);
module.exports=User;