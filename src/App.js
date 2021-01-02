import React, {useState} from 'react'
import {useApolloClient, useQuery, useSubscription} from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendation from './components/Recommendation';
import {ALL_BOOKS, BOOK_ADDED, ME} from './queries';


const App = () => {
    const client = useApolloClient()
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(null)
    const [error, setError] = useState(null)
    const {data} = useQuery(ME)

    const updateCacheWith = (addedBook) => {
        const includedIn = (set, object) => {
            return set.map(p => p.title).includes(object.title)
        }

        const dataInStore = client.readQuery({query: ALL_BOOKS})
        if (!includedIn(dataInStore.allBooks, addedBook)) {
            client.writeQuery({
                query: ALL_BOOKS,
                data: {allBooks: dataInStore.allBooks.concat(addedBook)}
            })
        }
    }

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({subscriptionData}) => {
            const addedBook = subscriptionData.data.bookAdded
            updateCacheWith(addedBook)
        }
    })
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