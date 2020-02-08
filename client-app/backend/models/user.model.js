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
            ticket_id :{type:String },
            code:{type:String },
            possible_profit:{ type: Schema.Types.Decimal128},
            total_odd:{ type: Schema.Types.Decimal128}
        }
    ]
})

const User = mongoose_.model('User',UserSchema);
module.exports=User;