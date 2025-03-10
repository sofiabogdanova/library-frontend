import React, {useEffect, useState} from 'react'
import {useMutation} from '@apollo/client'
import {LOGIN} from '../queries'

const Login = ({setError, setToken, show, setPage}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
            setTimeout(() => {
                setError(null)
            }, 3000)
        },

    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
        }
    }, [result.data]) // eslint-disable-line

    if (!show) {
        return null
    }


    const submit = async (event) => {
        event.preventDefault()

        const res = await login({variables: {username: username, password: password}})
        if (res) {
            setPage('authors')
        }
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username <input
                    value={username}
                    onChange={({target}) => setUsername(target.value)}
                />
                </div>
                <div>
                    password <input
                    type='password'
                    value={password}
                    onChange={({target}) => setPassword(target.value)}
                />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default Login