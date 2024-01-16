import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios"
import axios from 'axios'

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const backendURL = 'https://backendcommandsystem2024-production.up.railway.app';

        const authenticateUser = async () => {
            const token = localStorage.getItem('token')

            console.log('Token:', token);
            if(!token) {
                setLoading(false)
                return
            }

            const config = {
                headers : {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            
            try {
                const {data} = await axios(`${backendURL}/api/auth/profile`, config)
                setAuth(data)
                navigate('/app')
            } catch (error) {
                console.log(error)
                setAuth({})
            } finally{
                 setLoading(false) 
            }            
        }
        authenticateUser()
    }, [])

    const closeSessionAuth = () => {
        setAuth({})
    }

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth, 
                loading,
                closeSessionAuth
            }}
        >


            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext
