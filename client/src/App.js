import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchMovies from './pages/SearchMovies';
import SavedMovies from './pages/SavedMovies';
import Navbar from './components/Navbar';
import Footer from './components/Footer'

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client= {client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchMovies} />
            <Route exact path='/saved' component={SavedMovies} />
            <Route render={() => <h1 className='display-2'>Wrong Page!</h1>} />
          </Switch>
          <Footer />
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
