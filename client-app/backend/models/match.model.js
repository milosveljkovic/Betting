const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
    title: {
        type: String,
        required : true
    },
    sport: {
        type: String,
        required: true
    },
    date_of_match: {
        type : Date,
        required: true
    },
    odds: [
        {
            odd: {
                type: Schema.Types.Decimal128
            },
            final_score: {
                type: String
            },
            included_odds: {
                type: Boolean
            }
        }
    ]
});

module.exports = mongoose.model('Match', MatchSchema);