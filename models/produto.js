const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    serial: {
        type: String,
        required: true,
        unique: true
    },
    fabricante: {
        type: String,
        required: true
    },
    nacionalidade: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true,
    },
    teor: {
        type: String,
        required: true
    },
    ibu: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('cerveja', UserSchema)