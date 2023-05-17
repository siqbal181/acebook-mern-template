import React, { createContext, useState } from 'react'

export const AuthenticationContext = createContext({})

const AuthenticationProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [token, setToken] = useState("")
  const [userId, setUserId] = useState("")
  return (
    <AuthenticationContext.Provider value={{isLoggedIn, setIsLoggedIn, username, setUsername, token, setToken, userId, setUserId}}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationProvider;
