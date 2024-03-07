import React, { useContext, useState } from 'react'
import { User } from '../User'
import { Link , useNavigate} from 'react-router-dom'
import axios from "axios"

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] =useState("")
  const navigate = useNavigate();
  const {setUser} =  useContext(User)
  const [errorMessage, setErrorMessage] = useState("");
  async function handleLogin(e) {
    e.preventDefault()
    try {
      
    const {data} =  await  axios.post('/login', {email, password})
    setUser(data)
      navigate('/')
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
       
        setErrorMessage(error.response.data.error);
      } else {
        // Handle other errors
        console.error(error);
      }
    }
  }
  return (
    <>

    <div className='mt-[250px]  grow flex items-center justify-around'>
      <div className="mb-64">
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      <h1 className="text-4xl text-center mb-4">Login</h1>
      <form action="" className='max-w-md mx-auto' onSubmit={handleLogin}>
        <input type="email" placeholder='type your email' value={email} 
        onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder='type password' value={password}
        onChange={e => setPassword(e.target.value)} />
        <button className="bg-primary p-2 w-full text-white rounded-2xl ">Login</button>
        <div className='text-center py-2 text-gray-500'>Don't have an account yet ?  <Link className='underline text-black' to={"/reg"}>Register now</Link> </div>
       
      </form>

      </div>
    </div>
    </>
  )
}

