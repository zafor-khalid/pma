import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState('')
    const [token, setToken] = useState('')

    useEffect(() => {

        if (localStorage.getItem('userToken')) {
            setToken(localStorage.getItem('userToken'))
        }
        if (localStorage.getItem('userName')) {
            setCurrentUser(localStorage.getItem('userName'))
        }

    }, [])
    async function Login(username, password) {
        const authBody = {
            username: username,
            password: password,
        }
        const header = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const res = await axios.post('http://127.0.0.1:8000/api/token/', authBody, header)
        // console.log(res);
        const data = await res.data.access
        await localStorage.setItem("userToken", data)
        if (data) {
            const res2 = await axios.get(`http://127.0.0.1:8000/user/?username=${username}`, header)
            // console.log(res2.data[0].username);
            localStorage.setItem("userName", res2.data[0].username)
        }

    }
    function Logout() {
        setCurrentUser('')
        localStorage.setItem('userName', null)
    }

    const value = {
        Login,
        token,
        currentUser,
        Logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
