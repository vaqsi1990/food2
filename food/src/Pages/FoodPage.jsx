import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {User} from "../User";
import axios from 'axios'
import AccauntNav from '../Parts/AccauntNav';
import Image from '../Parts/Image';
export default function FoodPage() {
 
  const [food, setFood] = useState([])

  let {subpage} = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }
  const navigate = useNavigate();
  if(!User) {
    navigate('/login'); 
  }

  
  useEffect( () => {
    axios.get('/users-food').then( ({data}) => {
      setFood(data)
    } )
  } )
  
 async function deleteFood(id){
 
    try {
      await axios.delete(`http://localhost:4500/delete/${id}`);
      setFood(food.filter(item => item._id !== id));
      console.log('deleted');
     
    } catch (error) {
      console.error('Error delete:', error);
      throw error;
    }
  }
  return (
    <>
  
  <div>
    <div className="text-center mt-[150px]">
    <AccauntNav />
          <Link className="inline-flex mt-3 gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/food/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
            Add new Recipe
          </Link>
        </div >
      
<div className="container my-12 mx-auto px-4 md:px-12">
    <div  className="flex flex-wrap -mx-1 lg:-mx-4">

     

        {food.length > 0 && food.map( place => (
        <div key={food._id} className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">

        <article className="overflow-hidden rounded-lg shadow-lg">
<>
<Link to={'/account/food/'+place._id}>
   
                  
   {place.photos.length > 0 && (

<Image className="rounded-2xl object-cover aspect-square" src={place.photos?.[0]} alt=""/>
   )}

</Link>

<header className="flex items-center justify-between leading-tight p-2 md:p-4">
    <h1 className="text-lg">
        {place.title}
        
    </h1>
    <button
  type="button"
  onClick={() => deleteFood(place._id)}
  className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
  Delete
</button>
</header>
</>

        </article>
          
        

        </div>
        ))}
    
     
     

    </div>
</div>
    </div>
    </>
  )
}
