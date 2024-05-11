"use client"

import Cookies from "js-cookie"
import { createContext, useState, useEffect, useContext } from "react"


export let AuthContext = createContext(null)

export function AuthContextProvider ({ children }) {
    let [ username, setUsername ] = useState(Cookies.get('username'))
    let [ token, setToken ] = useState(Cookies.get('token'))

    function login (username, token) {
        setUsername(username)
        setToken(token)
    }

    function logout () {
        login(null, null)
    }

    useEffect(() => {
        if (username) Cookies.set('username', username)
        else Cookies.remove('username')

        if (token) Cookies.set('token', token)
        else Cookies.remove('token')
    
    }, [username, token])

    return (
        <AuthContext.Provider value={{ username, token, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export let useAuth = () => useContext(AuthContext)