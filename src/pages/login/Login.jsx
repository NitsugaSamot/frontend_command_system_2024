import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from "../../components/alert/Alert"
import clienteAxios from "../../config/clienteAxios"
import useAuth from "../../hooks/useAuth"
import Logo from '../../../public/chef-logo.jpg'
import axios from 'axios'


const Login = () => {

    const[name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState({})
  
    const {setAuth} = useAuth()
  
    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
    
        if([name, password].includes('')) {
          setAlert({
            msg: 'Todos los campos son obligatorios',
            error: true
          })
          return
        }
    
        try {
            const { data } = await clienteAxios.post(`/api/auth/login`, { name, password });
          setAlert({})
          localStorage.setItem('token', data.token)
          setAuth(data)
          // navigate('/')
          navigate('/app')
    
        } catch (error) {
            console.log(error)
            setAlert({
              msg: error.response.data.msg,
              error: true
            })
        }
      }

      const { msg } = alert

  return (
    <>
        <div className="container-login shadow flex flex-col items-center justify-center min-h-screen">
            <div className="flex flex-col items-center">
                <img src={Logo} className="rounded-3xl mt-4 logo" alt="logo" />
            </div>

            {msg && <Alert alerta={alert}/>}


            <form 
                className="my-10 bg-whitesmoke rounded-lg p-10"
                onSubmit={handleSubmit}
                >
                <div className="my-5">
                <label 
                className="uppercase text-center text-gray-700 block text-xl font-bold"
                htmlFor="name">
                Name
                </label>

                    
                    <input 
                        id="name"
                        type="text"
                        placeholder="USUARIO"
                        className="w-full mt-3 p-3 text-center border rounded bg-gray-50"
                        value={name}
                        onChange={ e=> setName(e.target.value)}
                    />

                </div>

                <div className="my-5">
                    <label 
                    className="uppercase text-center text-gray-700 block text-xl font-bold"
                    htmlFor="password">
                        Password
                    </label>
                    
                    <input 
                        id="password"
                        type="password"
                        placeholder="PASSWORD"
                        className="w-full mt-3 p-3 text-center border rounded bg-gray-50"
                        value={password}
                        onChange={ e=> setPassword(e.target.value)}
                    />


                </div>

                <input 
                    type="submit" 
                    value="INGRESAR"
                    className="bg-orange-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-orange-800 transition-colors"    
                />


            </form>
            </div>

        <nav className="lg:flex lg:justify-between">
            Informacion de la página
        </nav>
    </>

  )
}

export default Login