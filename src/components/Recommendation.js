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
    // useEffect(() => {
    //     setBooks([{
    //         title: 'title',
    //         author: {
    //             name: 'author'
    //         },
    //         published: 1992
    //     }])
    //     /*return
    //     if (result.data) {
    //         const filteredBooks = result.data.allBooks
    //         setBooks(filteredBooks)
    //         console.log(books)
    //     }*/
    // }, [result])
    // const { data } = useQuery(BOOKS_BY_GENRE, {
    //     variables: {
    //         genre: genre
    //     },
    //     onCompleted: data => setBooks(data.allBooks)
    // })


    if (!props.show || !props.genre) {
        return null
    }

    // if (books.length === 0) {
    //     // lazy query
    //     getResult({variables: {genre: genre}})
    // }


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
                        // .filter((book) => book.genres.includes(genre))
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