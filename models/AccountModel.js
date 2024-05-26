const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true
    },
    money: {
        type: Number,
        default: 0,
    },
    date: {
        type: String,
        required: true
    },
    useFor: {
        type: String,
        required: true
    },
})

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;