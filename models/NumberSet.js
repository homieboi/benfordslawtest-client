const { Schema, model } = require('mongoose')

const NumberSetSchema = new Schema({
    username: {
        type: String,
        required: true,
        default: '',
    },
    numbers: {
        type: Array,
        required: true,
        default: [],
    }
})

module.exports = model('NumberSet', NumberSetSchema)