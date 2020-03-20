import React from 'react';
import ReactDOM from 'react-dom';
// connect React + Apollo provides the React Apollo functionality to all the other components in the application without passing it explicitly. The package also contains graphql function used to "enchance" our components with data.
import { ApolloProvider } from 'react-apollo';
// Apollo Client we'll use it to create our GraphQL client using ApolloClient.
import { ApolloClient } from 'apollo-client';
// combine httplink and errorlink
import { ApolloLink } from 'apollo-link';
// apollo-link-http is used to configure the URI and additional network information once for an Apollo Client instance.
import { HttpLink } from 'apollo-link-http';
// Gerer les erreurs GraphQL
import { onError } from 'apollo-link-error';
// Client to manage the data - InMemoryCache will normalize our data before saving it to the store by splitting the result into individual objects, creating a unique identifier for each object, and storing those objects in a flattened data structure.
import { InMemoryCache } from 'apollo-cache-inmemory';

import * as serviceWorker from './serviceWorker';
import App from './app';

// Custom CSS
import './assets/style.css';

// use .env
require('dotenv').config();

const GRAPHCMS_API = process.env.REACT_APP_GRAPHCMS_URL;
const GRAPHCMS_AUTH = process.env.REACT_APP_GRAPHCMS_ACCESS_TOKEN;

const httpLink = new HttpLink({
  uri: GRAPHCMS_API,
  headers: {
    authorization: `Bearer ${
      GRAPHCMS_AUTH
    }`,
  }
});

// gerer les erreur GraphQL et networkError
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    if(graphQLErrors.message === 'the Token you passed is Invalid!'){
      localStorage.clear(); window.location.reload();
    }
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

// combine errorlink and httplink, links can be used to accessand modify the GraphQL control flow
const link = ApolloLink.from([errorLink, httpLink]);

// Cache as the place where the data is managed in Apollo Client
const cache = new InMemoryCache();

// Local Default Storage
const defaults = {
  todos: [],
  visibilityFilter: 'SHOW_ALL',
};

// the link and the cache, to create the instance of the Apollo Client 
const client = new ApolloClient({
  link,
  cache,
  clientState: {
    defaults
  }
});

// Next, we need to wrap our rendered <App /> component in ApolloProvider so we can access our data throughout the application.
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
