import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Home from "../pages/home/Home"

const ProtectedRoutes = () => {

  const {auth, loading} = useAuth()

  if(loading) return 'Loading...'

  return (
    <>
      {auth._id ? (
        <div>
          <div>
            <main>
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
  
  // return (
  //   <>
  //       {auth._id ? 
  //       (
  //         <div >
  //           {/* <Home/> */}

  //           <div>


  //             <main >
  //               <Outlet/>
  //             </main>
  //           </div>
  //         </div>
  //       ) : <Navigate to='/'/>}
  //   </>
  // )
}

export default ProtectedRoutes