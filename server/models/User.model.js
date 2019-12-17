const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    username: String,
    password: String,
    age: Number,
    level: String,
    email: String,
    experience: String,
    role: {
        type: String,
        enum: ['User', 'Teacher']
    }
}, {
    timestamps: true
})


const User = mongoose.model('User', userSchema)
module.exports = User