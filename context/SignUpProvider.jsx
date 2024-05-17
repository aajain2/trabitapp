import React, { createContext, useContext, useState } from 'react'

const SignUpContext = createContext()
export const useSignUpContext = () => useContext(SignUpContext)

const SignUpProvider = ({ children }) => {
  const [name, setName] = useState("")
  const [birthday, setBirthday] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (
    <SignUpContext.Provider
      value={{
        name,
        setName,
        birthday,
        setBirthday,
        email,
        setEmail,
        username,
        setUsername,
        password,
        setPassword
      }}
    >
      {children}
    </SignUpContext.Provider>
  )
}

export default SignUpProvider