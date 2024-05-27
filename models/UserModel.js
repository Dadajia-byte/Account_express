const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    account: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userInfo: {
        type: Object,
        default: {
            name: '你需要个名字',
            phone: '',
            email: '',
            avatar: '',
            brief: '这个家伙很懒，什么都没留下'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const User = mongoose.model('User', userSchema)
module.exports = User;