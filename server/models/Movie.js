const { Schema } = require('mongoose');

const movieSchema = new Schema({
    genre_ids: [
        {
            type: Number,
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
    },
    movieId: {
        type: String,
        required: true
    },
    poster_path: {
        type: String
    }
});

module.exports = movieSchema;