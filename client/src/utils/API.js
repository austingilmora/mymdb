const APIKey = process.env.REACT_APP_API_KEY

export const searchTMDB = (query) => {
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&query=${query}`);
}