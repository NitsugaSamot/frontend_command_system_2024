import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import Logo from '../../../public/chef-logo.jpg'


function Header() {

    const {closeSessionAuth} = useAuth()

    const handleCloseSession = () => {
        closeSessionAuth()
        localStorage.removeItem('token')
    }

    return (
        <header className="px-4 py-5 bg-white border-b">
            <div className="md:flex md:justify-between">
                <h2 className="text-4xl text-red-400 font-black text-center mb-5 md:mb-0">
                    <Link
                        to='/app'
                        className="font-bold uppercase"
                    >
                         <img src={Logo} alt="Logo" className="w-24 h-24 mr-2 rounded-3xl" />
                    </Link>
                </h2>
    
                <div className="flex flex-col md:flex-row items-center gap-4">
    
                    <button 
                        type="button"
                        className="font-bold uppercase"
                    >
                        Buscar 
    
                    </button>
     
                    <Link
                        to='/app/commands'
                        className="font-bold uppercase text-black hover:text-orange-500"
                    >
                        Comandas
                    </Link>     
    
                    <button
                        type="button"
                        className="text-white text-sm bg-black p-3 rounded-md uppercase font-bold"
                        onClick={handleCloseSession}
                    >
                        Cerrar Sesión    
                    </button>      
    
                    {/* <Busqueda />         */}
                </div>
            </div>
        </header>
      )
}

export default Header