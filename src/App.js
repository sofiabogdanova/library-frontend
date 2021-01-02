import React, {useState} from 'react'
import {useApolloClient, useQuery} from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendation from './components/Recommendation';
import {ME} from "./queries";


const App = () => {
    const client = useApolloClient()
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(null)
    const [error, setError] = useState(null)
    const { data } = useQuery(ME)

    const logout = () => {
        localStorage.clear()
        client.resetStore()
        setToken(null)
    }

    if (/*result.loading || books.loading ||*/ !data) {
        return <div>loading...</div>
    }
    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                {token && <button onClick={() => setPage('add')}>add book</button>}
                {token && <button onClick={() => setPage('recommendation')}>recommendation</button>}
                {token && <button onClick={logout}>logout</button>}


                {!token && <button onClick={() => setPage('login')}>login</button>}

            </div>
            {error && <div>
                {error}
            </div>}
            <Authors
                show={page === 'authors'}
            />

            <Books
                show={page === 'books'}
            />

            <NewBook
                show={page === 'add'}
            />

            {data.me && <Recommendation
                show={page === 'recommendation'} genre={data.me ? data.me.favoriteGenre : ''}
            />}

            <Login
                show={page === 'login'} setError={setError} setToken={setToken} setPage={setPage}
            />
        </div>
    )
}

export default App