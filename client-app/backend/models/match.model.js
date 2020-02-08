const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
    team1: {
        name: {
            type: String,
            required : true
        },
        teamId: {
            type: Schema.Types.ObjectId
        }
    },
    team2: {
        name: {
            type: String,
            required : true
        },
        teamId: {
            type: Schema.Types.ObjectId
        }
    },
    team1score: {
        type: Number
    },
    team2score: {
        type: Number
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