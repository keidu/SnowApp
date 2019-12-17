const mongoose = require('mongoose')
const Schema = mongoose.Schema


const mapSchema = new Schema({

    creatorIdTeacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    creatorIdUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    address: String,
    title: String,
    description: String,
    horario: String,
    geoLocation: { type: { type: String }, coordinates: [Number] }
}, {
    timestamps: true
})


const Map = mongoose.model('Map', mapSchema)
module.exports = Map