const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref : 'User'
    },
    date: {
        type : Date,
        required: true
    },
    matches: [
        {
            title: {
                type: String,
                required : true
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