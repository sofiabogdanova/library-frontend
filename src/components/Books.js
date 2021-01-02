import React, {useState} from 'react'
import {useQuery} from '@apollo/client'
import {ALL_BOOKS} from '../queries'

const Books = (props) => {
    const result = useQuery(ALL_BOOKS)
    const [genre, setGenre] = useState('')
    if (!props.show) {
        return null
    }

    if (result.loading) {
        return <div>loading...</div>
    }
    const allBooks = result.data.allBooks
    let books = allBooks
    if (genre) {
        books = allBooks.filter(b => b.genres.includes(genre))
    }
    let genres = [...new Set(allBooks.flatMap(b => b.genres))]

    const filterByGenre = (g) => {
        setGenre(g)
    }

    return (
        <div>
            <h2>books</h2>
            {genre &&
            <div>in genre {genre}</div>
            }

            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>
                        author
                    </th>
                    <th>
                        published
                    </th>
                </tr>
                {books.map(a =>
                    <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                )}
                </tbody>
            </table>
            {genres.map(g => <button key={g} onClick={() => filterByGenre(g)}>{g}</button>)}
        </div>
    )
}

export default Books