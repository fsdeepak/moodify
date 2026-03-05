import React, { useState } from 'react'
import "../styles/login.scss"
import "../../shared/styles/button.scss"
import FormGroup from '../components/FormGroup'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'

import useAuth from "../hooks/useAuth"

const login = () => {

  const navigate = useNavigate()

  const {loading, handleLogin} = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

async function handleSubmit(e) {
  e.preventDefault()

  await handleLogin({email, password})
  navigate("/")
}

  return (
    <main className="login-page">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>

          <FormGroup 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          type={"text"} 
          label={"Email"} 
          placeholder={"Enter your email id"}/>

          <FormGroup 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          type={"password"} 
          label={"Password"} 
          placeholder={"Enter your password"}/>

          <button type="submit" className='button'>Login</button>

        </form>

        <p>Do'not have an  account? <Link to={"/register"}>Register here</Link></p>

      </div>
    </main>
  )
}

export default login