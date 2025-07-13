import { AuthContext } from "../context/AutContext"
import { useContext } from "react"
import { Navigate } from "react-router-dom"

function ProtectedRoute({children}) {
    const {user}=useContext(AuthContext)
    
    if(!user)
        {
           return  <Navigate to='/' replace/>
        }

    return children;
    
   
}

export default ProtectedRoute
