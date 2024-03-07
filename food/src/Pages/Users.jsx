import React, { useEffect, useState } from 'react'
import AccauntNav from '../Parts/AccauntNav'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Users() {
  const [users, setUsers] = useState('')
  useEffect( () => {
    axios.get('/all-Users')
    .then( res => setUsers(res.data) )
  }, [] )
  console.log(users);
  const remove = async(favouriteId) => {
    try {
      await axios.delete(`http://localhost:4500/deleteUser/${favouriteId}`);
      setUsers(users.filter(item => item._id !== favouriteId));
      console.log('deleted');
     
    } catch (error) {
      console.error('Error delete:', error);
      throw error;
    }
 
  }
  return (
    <div className='mt-[150px] h-[100vh]'>
 <AccauntNav />
 <div className="flex flex-wrap md:flex-col">
 {
  users?.length > 0 && users.map(user => (
  
    !user.isAdmin && (
      
      <div key={user.id} className="my-1 mx-auto px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
        
       <article className="overflow-visible rounded-lg shadow-[rgba(0,0,2,0.2)_2px_2px_2px_2px]">
    <header className="flex justify-between items-center leading-tight p-2 md:p-4">
      <h1 className="text-lg">
        <Link to={`/user/${user._id}`}>
          {user.name}
        </Link>
      </h1>
      <button className='py-1 px-6 rounded-full bg-primary text-white' onClick={() => remove(user._id)}>Delete</button>
    </header>
  </article>
      </div>
    )
  ))
}

</div>
    </div>
  )
}
