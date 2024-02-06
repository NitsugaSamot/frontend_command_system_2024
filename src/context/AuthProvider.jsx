import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios"

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})
    const [loading, setLoading] = useState(true)
    const [updateTrigger, setUpdateTrigger] = useState(false);

    const forceUpdate = () => {
        setUpdateTrigger((prev) => !prev);
      };

    const navigate = useNavigate()

    useEffect(() => {

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
                const {data} = await clienteAxios('/api/auth/profile', config)
                console.log('User Data:', data);
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
                closeSessionAuth, 
                forceUpdate
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
