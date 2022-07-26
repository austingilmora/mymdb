const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Auth {
        token: ID!
        user: User
    }

    type User {
        _id: ID
        username: String
        email: String
        savedMovies: [Movie]
    }

    type Movie {
        genre_ids: [Int]
        overview: String
        title: String
        runtime: Int
        rating: Float
        votes: Int
        movieId: ID
        poster_path: String
    }

    input MovieInput {
        genre_ids: [Int]
        overview: String
        title: String
        runtime: Int
        rating: Float
        votes: Int
        movieId: ID
        poster_path: String
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveMovie(input: MovieInput): User
        removeMovie(movieId: ID!): User
    }
`

module.exports = typeDefs