import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Header from '../Parts/Header';

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function regUser(e) {
    e.preventDefault();
    try {
      await axios.post('/register', {
        name,
        email,
        password
      });
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
       
        setErrorMessage(error.response.data.error);
      } else {
       
        console.error(error);
      }
    }
  }
  
  return (
    <>
      <Header />
      <div className='mt-[250px] grow flex items-center justify-around'>
        <div className="mb-64">
          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          <h1 className="text-4xl text-center mb-4">Register</h1>
          <form action="" className='max-w-md mx-auto' onSubmit={regUser}>
            <input type="text" placeholder='type your name' value={name} onChange={e => setName(e.target.value)} />
            <input type="email" placeholder='type your email' value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder='type password' value={password} onChange={e => setPassword(e.target.value)} />
            <button className="bg-primary p-2 w-full text-white rounded-2xl ">Create Account</button>
          </form>
        </div>
      </div>
    </>
  );
}

