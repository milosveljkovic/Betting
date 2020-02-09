const mongoose_ = require('mongoose');
const Schema= mongoose_.Schema;

const TeamSchema = new Schema({
    name : {
        type : Schema.Types.String,
        required : true
    },
    sport : {
        type : Schema.Types.String,
        required : true
    },
    logo_url : {
        type : Schema.Types.String,
        required : false
    },
    number_of_wins : {
        type : Schema.Types.Number,
        required : true
    },
    number_of_losses : {
        type : Schema.Types.Number,
        required : true
    },
    number_of_draws : {
        type : Schema.Types.Number,
        required : true
    }
})

const Team = mongoose_.model('Team',TeamSchema);
module.exports=Team;