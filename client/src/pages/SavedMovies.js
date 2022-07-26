import { useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_MOVIE } from '../utils/mutations';
import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import Auth from '../utils/auth';
import { removeMovieId } from '../utils/localStorage';

const SavedMovies = () => {
    // const userDataLength = Object.keys(userData).length;
    
    const {loading, data} = useQuery(GET_ME);
    const [removeMovie, {error}] = useMutation(REMOVE_MOVIE);

    const userData = data?.me || [];

    const handleDeleteMovie = async (movieId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if(!token) {
            return false;
        }

        try {
            const {data} = await removeMovie({
                variables: { movieId }
            });

            removeMovieId(movieId);

        } catch (err) {
            console.error(err);
        }
    };

    if(!Object.keys(userData).length) {
        return <h2>LOADING...</h2>
    }

    return (
        <>
            <Jumbotron fluid className='text-light bg-dark'>
                <Container>
                    <h1>Here are your saved Movies:</h1>
                </Container>
            </Jumbotron>
            <Container>
                <h2>
                    {userData.savedMovies.length
                    ? `Viewing ${userData.savedMovies.length} saved ${userData.savedMovies.length === 1 ? 'movie' : 'movies'}:`
                    : "You haven't saved any movies yet!"}
                </h2>
                <CardColumns>
                    {userData.savedMovies.map((movie) => {
                        return (
                            <Card key={movie.movieId} border='dark'>
                                {movie.poster_path ? <Card.Img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={`The poster for ${movie.title}`} variant='top' /> : null }
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Text>{movie.overview}</Card.Text>
                                    <Button className='btn-block btn-danger' onClick={() => handleDeleteMovie(movie.movieId)}>
                                        Delete this Movie
                                    </Button>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
            </Container>
        </>
    )
}

export default SavedMovies;