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
        required: true,
        index:{unique:true}
    },
    age:{
        type:Number,
        require:true,
        min:18
    },
    credit:{
        type:Schema.Types.Decimal128,
        min:0
    },
    is_admin:{
        type:Boolean,
        required:true
    },
    my_tickets:[
        {
            ticket_id : {type : Schema.Types.ObjectId },
            code : {type : String },
            possible_profit : {type : Schema.Types.Decimal128},
            total_odd : {type : Schema.Types.Decimal128}
        }
    ],
    has_extra_credit:{
        type : Boolean,
        default : false
    },
    wasted_credit:{
        type : Schema.Types.Decimal128,
        default: 0.0
    }
})

const User = mongoose_.model('User',UserSchema);
module.exports=User;