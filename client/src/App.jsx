import {Routes,Route,Link} from 'react-router-dom'
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import Profile from "./components/Profile"
import Dashboard from "./components/Dashboard"
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'


function App() {
  return (
    <>
    <Routes>
      <Route element={<Layout/>}>
        <Route path='/profile' element={
          <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
        }/>
        <Route path='/dashboard' element={
          <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
        }/>
      </Route>
        <Route path='/' element={<Login/>}/>
     </Routes>
    </>
  )
}

export default App
