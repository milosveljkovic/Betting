const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    date: {
        type : Date,
        required: true
    },
    matches: [
        {   
            matchId: {
                type: Schema.Types.ObjectId,
                required: true
            },
            team1: {
                type: String,
                required : true
            },
            team2: {
                type: String,
                required : true
            },
            team1score: {
                type: Number
            },
            team2score: {
                type: Number
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
        }
    ],
    payment: {
        type : Schema.Types.Decimal128,
        required: true
    },
    total_odd: {
        type : Schema.Types.Decimal128,
        required: true
    },
    possible_profit: {
        type : Schema.Types.Decimal128,
        required: true
    },
    is_winning_ticket: {
        type : Boolean
    },
    check_date: {
        type: Date
    }
});

module.exports = mongoose.model('Ticket', TicketSchema);