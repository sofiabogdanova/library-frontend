import {useQuery} from '@apollo/client'
import React, {useState} from 'react'
import {BOOKS_BY_GENRE} from '../queries'

const Recommendation = (props) => {
    const [genre, setGenre] = useState(props.genre)
    console.log('genre :>> ', genre)

    const variables = genre ? {genre} : ''
    const {data} = useQuery(BOOKS_BY_GENRE, {
        variables: {
            genre: genre
        }
    })

    if (!props.show || !props.genre) {
        return null
    }

    return (
        <div>
            <h2>books</h2>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {genre ? (
                    data?.allBooks
                        .map((a) => (
                            <tr key={a.title}>
                                <td>{a.title}</td>
                                <td>{a.author.name}</td>
                                <td>{a.published}</td>
                            </tr>
                        ))
                ) : (
                    <p>log in</p>
                )}
                </tbody>
            </table>
        </div>
    )
}
export default Recommendation