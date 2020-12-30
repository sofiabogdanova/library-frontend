import React from 'react'
import ReactDOM from 'react-dom'
import {
    ApolloClient, ApolloProvider, HttpLink, InMemoryCache
} from '@apollo/client'

import App from './App'

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://localhost:4000',
        onError: (e) => {
            console.log(e) },
    })
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.getElementById('root'))