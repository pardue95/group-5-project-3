import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ChakraProvider } from '@chakra-ui/react'
import theme from "../src/theme";

import './App.css';
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from './components/Navbar/index';
import Footer from './components/Footer/Footer'
import Profile from './pages/Profile';
import AddWishlist from './pages/AddWishlist';
// import Landing from './components/Landing'

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ChakraProvider theme={theme}>
    <ApolloProvider client={client}>
      <Router>
        <>

          <Navbar />
          {/* <Landing /> */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile/:id?" component={Profile} />
            <Route exact path="/addWishlist" component={AddWishlist} />
            {/* <Route exact path="/" component={SearchGifts} />
            <Route exact path="/saved" component={SavedGifts} /> */}
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
        </>
        <Footer />
      </Router>
    </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;
