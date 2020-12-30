import React, {useState} from 'react'
import {useMutation, useQuery} from '@apollo/client'
import Select from 'react-select'
import {ALL_AUTHORS, EDIT_AUTHOR} from '../queries'

const Authors = (props) => {
    const result = useQuery(ALL_AUTHORS)
    const [selectedAuthor, setSelectedAuthor] = useState(null);
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
        editAuthor({
            variables: {name: selectedAuthor.value, setBornTo: +birthDate}
        })

        setSelectedAuthor('')
        setBirthDate('')
    }

    const authors = result.data.allAuthors
    const authorsOptions = authors.map(a => ({
        value:a.name,
        label: a.name
    }))
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
                    <Select
                        defaultValue={selectedAuthor}
                        onChange={setSelectedAuthor}
                        options={authorsOptions}
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
