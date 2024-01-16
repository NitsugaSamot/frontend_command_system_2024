import {BrowserRouter,Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './layouts/ProtectedRoutes';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Commands from './components/commands/Commands';
import { AuthProvider } from './context/AuthProvider';


function App() {
  return (
    <BrowserRouter>
        <AuthProvider>

            <Routes>
              <Route path="/" element={<AuthLayout/>}>
                <Route index element={<Login />} />
              </Route>

              <Route path="/app" element={<ProtectedRoutes/>}>
                    <Route index element={<Home/>}/>
                    <Route path="commands" element={<Commands />} />
                </Route>
        
            </Routes>

        </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

// import { BrowserRouter, Routes, Route} from 'react-router-dom'
// import Login from './pages/login/Login'
// import Home from './pages/home/Home'
// import CreateMenu from './components/create-menu/CreateMenu'
// import NewCommand from './components/new-command/NewCommand'
// import Commands from './components/commands/Commands'
// import { AuthProvider } from './context/AuthProvider'
// import ProtectedRoutes from './layouts/ProtectedRoutes'

// function App() {

//   return (

//     <AuthProvider>
//         <BrowserRouter>
//             <Routes>
//                 <Route>
//                     <Route path='create' element={<Home/>}/>
//                     <Route path='/' element={<Login/>}/>
//                     {/* <Route>

//                     </Route> */}

//                 </Route>

//                 <Route path='/app' element={<ProtectedRoutes/>}/>

//                 <Route path='new-menu' element={<CreateMenu/>}/>
//                     <Route path='new-command' element={<NewCommand/>}/>
//                     <Route path='commands' element={<Commands/>}/>
//                 </Route>
//             </Routes>
//         </BrowserRouter>
//     </AuthProvider>

//   )
// }

// export default App
