import React, { useContext } from 'react'
import { User } from '../User'
import {  Navigate, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FoodPage from './FoodPage';
import AccauntNav from '../Parts/AccauntNav';
import Footer from './Footer';

export default function Account() {
    const {user, ready, setUser} =  useContext(User)
  const navigate = useNavigate();
 
  let {subpage} = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }
  
  if(!ready) {
    return 'Loading...'
  }
  
  if(ready && !user) {
    return <Navigate to={"/login"}  />
  }

  async  function logout() {
    await  axios.post('/logout')
    setUser(null)
    navigate('/'); 
    }
  return (
    <>
  
  <div className='mt-[150px] h-[100vh]'>
  <AccauntNav />
  {subpage === 'profile' && (
    <div className="text-center mt-5 max-w-lg mx-auto">
      Welcome {user?.name} <br />
      
      <button onClick={logout} className='bg-primary w-[200px] mt-3 text-white font-bold py-2 px-4 rounded-full'>Logout</button>
    </div>
  )}
    {subpage === 'food' && (
    <div className="text-center mt-5 max-w-lg mx-auto">
     <FoodPage />
    </div>
  )}
</div>

    </>
  )
}
