const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
let Schema = mongoose.Schema

let bookSchema = new Schema({
    author:{
        type: String,
        required: [true,"The autor is required."]
    },
    title:{
        type: String,
        unique: true,
        required: [true,"The title is required."]
    },
    description: {
        type: String,
        required: [true,"The description is required."]
    }
});

bookSchema.plugin( uniqueValidator,{message: '{PATH} debe ser único'})

module.exports = mongoose.model('Book', bookSchema);