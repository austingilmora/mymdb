const APIKey = process.env.REACT_APP_API_KEY

export const getMe = (token) => {
    return fetch('/api/users/me', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
};
  
export const createUser = (userData) => {
    return fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
};
  
export const loginUser = (userData) => {
    return fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
};

export const saveMovie = (movieData, token) => {
    return fetch('api/users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(movieData)
    });
};

export const deleteMovie = (movieId, token) => {
    return fetch(`/api/users/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${token}`
        }
    })
}
  
export const searchTMDB = (query) => {
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&query=${query}`);
}