import { gql } from '@apollo/client';

export const GET_ME = gql`
{
    me {
        _id
        email
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
`