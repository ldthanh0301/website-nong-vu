const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    creatAt: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type:Boolean,
        default: false
    }
})

module.exports = mongoose.model('users', UserSchema)