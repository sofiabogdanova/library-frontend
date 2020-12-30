import React, {useState} from 'react'
import {useMutation, useQuery} from '@apollo/client';
import {ALL_AUTHORS, EDIT_AUTHOR} from '../queries'

const Authors = (props) => {
    const result = useQuery(ALL_AUTHORS)
    const [name, setName] = useState('')
    const [birthDate, setBirthDate] = useState('')

    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{query: ALL_AUTHORS}]
    })

    if (!props.show) {
        return null
    }

    if (result.loading) {
        return <div>loading...</div>
    }

    const submit = async (event) => {
        event.preventDefault()
        debugger
        editAuthor({
            variables: {name: name, setBornTo: +birthDate}
        })

        setName('')
        setBirthDate('')
    }

    const authors = result.data.allAuthors

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>
                        born
                    </th>
                    <th>
                        books
                    </th>
                </tr>
                {authors.map(a =>
                    <tr key={a.name}>
                        <td>{a.name}</td>
                        <td>{a.born}</td>
                        <td>{a.bookCount}</td>
                    </tr>
                )}
                </tbody>
            </table>
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
                <div>
                    name
                    <input
                        type='text'
                        value={name}
                        onChange={({target}) => setName(target.value)}
                    />
                </div>
                <div>
                    born
                    <input
                        type='number'
                        value={birthDate}
                        onChange={({target}) => setBirthDate(target.value)}
                    />
                </div>
                <button type='submit'>update author</button>
            </form>
        </div>
    )
}

export default Authors
