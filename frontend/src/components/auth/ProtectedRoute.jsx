import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
  const isAuthenticated = false
  const loading = false
  const location = useLocation()

  if(loading){
    // add a loading animation
    return <div>Loading...</div>
  }

  if(!isAuthenticated){
    return <Navigate to="/login" state={{from: location}} replace />
  }

  return children
}

export default ProtectedRoute