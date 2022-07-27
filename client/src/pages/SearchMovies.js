import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { SAVE_MOVIE } from '../utils/mutations';
import { searchTMDB } from '../utils/API';
import { saveMovieIds, getSavedMovieIds } from '../utils/localStorage';


const SearchMovies = () => {
    const [saveMovie] = useMutation(SAVE_MOVIE);
    const [searchedMovies, setSearchedMovies] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [noMovies, setNoMovies] = useState(false);

    const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());

    useEffect(() => {
        return () => saveMovieIds(savedMovieIds);
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if(!searchInput) {
            return false;
        }

        try {
            const response = await searchTMDB(searchInput);
            

            if (!response.ok) {
                throw new Error("We can't seem to find a movie with that title...");
            }
            
            const { results }  = await response.json();

            const movieData = results.map((movie) => ({
                movieId: movie.id,
                genre_ids: movie.genre_ids,
                overview: movie.overview || ['No description to display'],
                title: movie.title,
                rating: movie.vote_average,
                votes: movie.vote_count,
                poster_path: movie.poster_path
            }));
            console.log(movieData);

            if(results.length === 0) {
                setNoMovies(true)
            } else {
                setNoMovies(false)
            }

            setSearchedMovies(movieData);
            setSearchInput('')
        } catch (err) {
            console.error(err);
        }
    };

    const handleSaveMovie = async (movieId) => {

        const movieToSave = searchedMovies.find((movie) => movie.movieId === movieId);
        
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if(!token) {
            return false;
        }

        try {
            const {data} = await saveMovie({
                variables: { input: movieToSave }
            });

            setSavedMovieIds([...savedMovieIds, movieToSave.movieId]);
            
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Jumbotron fluid className='text-light bg-dark'>
                <Container>
                    <h1>Search for Movies!</h1>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Row>
                            <Col xs={12} md={8}>
                                <Form.Control
                                    name='searchInput'
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    type='text'
                                    size='lg'
                                    placeholder='Search for a Movie'
                                />
                            </Col>
                            <Col xs={12} md={4}>
                                <Button type='submit' variant='success' size='lg'>
                                    Submit Search
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Container>
            </Jumbotron>

            <Container>
                <h2>
                    {searchedMovies.length
                        ? `Viewing ${searchedMovies.length} results:` 
                        : 'Search for a Movie to begin'}
                </h2>
                <h4>
                    {noMovies ? 'No movies found with that title' : ''}
                </h4>
                <CardColumns>
                    {searchedMovies.map((movie) => {
                        return (
                            <Card key={movie.movieId} border='dark'>
                                {movie.poster_path ? (
                                    <Card.Img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={`The poster for ${movie.title}`} variant='top' />
                                ) : null}
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <p className='small'>Rating: {movie.rating} /10</p>
                                    <p className='small'>Votes: {movie.votes}</p>
                                    <p className='small'>Description: {movie.overview}</p>
                                    {Auth.loggedIn() && (
                                        <Button
                                            disabled={savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)}
                                            className='btn-block btn-info'
                                            onClick={() => handleSaveMovie(movie.movieId)}>
                                                {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)
                                                ? 'This movie is already on your saved list!'
                                                : 'Save this Movie for later!'
                                            }
                                            </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        )
                    })}
                </CardColumns>
            </Container>
        </>
    );
};

export default SearchMovies;