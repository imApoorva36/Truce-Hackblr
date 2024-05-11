"use client"

import Cookies from "js-cookie"
import { createContext, useState, useEffect } from "react"


export let AuthContext = createContext(null)

export function AuthContextProvider ({ children }) {
    let [ username, setUsername ] = useState(Cookies.get('username'))
    let [ token, setToken ] = useState(Cookies.set('token'))

    function login (username, token) {
        setUsername(username)
        setToken(token)
    }

    function logout () {
        login(null, null)
    }

    useEffect(() => {
        Cookies.set('username', username)
        Cookies.set('token', token)
    }, [username, token])

    return (
        <AuthContext.Provider value={{ username, token, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}