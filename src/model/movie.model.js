const mongoose = require("mongoose");

const MovieSchemas = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
    },
    generes: {
        type: Array,
        required: true,
    },
    image: {
        type: String,
    },
    video: {
        type: String,
    },
},
{
    timestamps: true,
})

module.exports = mongoose.model("movies", MovieSchemas);