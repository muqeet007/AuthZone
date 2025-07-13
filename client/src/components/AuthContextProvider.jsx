import { AuthContext } from "../context/AutContext"
import { useEffect, useState } from "react"
import axios from '../axios'

function AuthContextProvider({children}) {
  const [user,setUser]=useState(null)


  const fetchUser=async()=>
  {
        try
        {
            const response=await axios.get('/api/user/me')
            setUser(response.data)
        }
        catch(error)
        {
            setUser(null)
        }
  }

  useEffect(
    ()=>{
        fetchUser()
    },[]
  )
  
    return (
    <AuthContext.Provider value={{user,setUser}}>
        {children}
    </AuthContext.Provider>
      
    
  )
}

export default AuthContextProvider
