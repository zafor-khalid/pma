import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const history = useNavigate()
    const [currentUser, setCurrentUser] = useState('')
    const [token, setToken] = useState('')
    const [userId, setUserId] = useState(null)
    const [users, setUsers] = useState()

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
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/token/', authBody, header)
            // console.log(res);
            const data = await res.data.access
            await localStorage.setItem("userToken", data)
            if (data) {
                try {
                    const res2 = await axios.get(`http://127.0.0.1:8000/user/?username=${username}`, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    localStorage.setItem("userName", res2.data[0].username)
                    localStorage.setItem("id", res2.data[0].id)
                    setUserId(res2.data[0].id)
                    setCurrentUser(res2.data[0].username)
                } catch (error) {

                }
                // console.log(res2.data);

            }
        } catch (error) {

        }


    }
    async function UserInfo(token) {
        try {
            const res2 = await axios.get(`http://127.0.0.1:8000/user/`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            // console.log(res2);
            setUsers(res2.data)

        } catch (error) {
            console.log(error);
        }
    }
    // UserInfo()
    function Logout() {
        setCurrentUser('')
        localStorage.setItem('userName', '')
        history("/login")
    }

    const value = {
        Login,
        token,
        currentUser,
        Logout,
        userId,
        users,
        UserInfo
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
