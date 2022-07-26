import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        user {
            username
            email
        }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
        }
        }
    }
`;

export const SAVE_MOVIE = gql`
    mutation saveMovie($input: MovieInput) {
        saveMovie(input: $input) {
            username
            savedMovies {
                genre_ids
                overview
                title
                runtime
                rating
                votes
                movieId
                poster_path
            }
        }
    }
`;

export const REMOVE_MOVIE = gql`
    mutation removeMovie($movieId: ID!) {
        removeMovie(movieId: $movieId) {
            username
            savedMovies {
                movieId
            }
        }
    }
`