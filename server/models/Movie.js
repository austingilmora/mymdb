const { Schema } = require('mongoose');

const movieSchema = new Schema({
    genres: [
        {
            type: String,
        },
    ],
    overview: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    runtime: {
        type: Number 
    },
    rating: {
        type: Number
    },
    votes: {
        type: Number
    }
});

module.exports = movieSchema;