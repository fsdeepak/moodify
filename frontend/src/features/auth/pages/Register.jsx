import FormGroup from "../components/FormGroup"
import "../styles/register.scss"
import { Link , useNavigate} from "react-router"

import useAuth from "../hooks/useAuth"
import { useState } from "react"

const Register = () => {

const navigate = useNavigate()

    const {loading, handleRegister} =  useAuth()

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        await handleRegister({username, email, password})
        navigate("/")
    }
    
  return (
    <main className="register-page">
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>

                    <FormGroup 
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    type={"text"} 
                    label="Username" 
                    placeholder="Enter your username" />

                    <FormGroup 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    type={"email"} 
                    label="Email" 
                    placeholder="Enter your email" />

                    <FormGroup 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    type={"password"} 
                    label="password" 
                    placeholder="Enter your password" />

                    <button className='button' type="submit">Register</button>

                </form>

                <p>Already have an  account? <Link to={"/login"}>Login here</Link></p>


            </div>
        </main>
  )
}

export default Register