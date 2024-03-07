import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import { User } from '../User'

import Comments from '../Parts/Comments'
import Image from '../Parts/Image'

export default function Single() {
  const {id} = useParams()
  const {user} =  useContext(User)
  const [food, setFood] = useState(null)

  useEffect( () => {
    if(!id) return
    axios.get(`/single/${id}`)
    .then( response =>  setFood(response.data))
  }, [id] )
  
  const ing = food?.ingredients


 
  
  
  
  

  const addToFavorites = async () => {
    try {
      const userId = user.id;
      const name = food.title;
      const foodId = food._id; 
      const photos = food.photos
      await axios.post('/add-to-favourite', { userId, foodId, name, photos });
    } catch (error) {
      console.error('Error adding item to favorites:', error);
    }
  };
  
if(!food) return ''
  return (
    <>
    
    <div className='mt-[130px] bg-gray-100  w-full px-8 pt-8 text-center' > 
    <h1 className='text-2xl text-center'>  {food.title} </h1>
    <h1 className='text-1xl text-center py-2'>  {food.category} </h1>
    <h2 className='flex gap-2 justify-center'> Time <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg> - {food.time}
</h2>

<div className="max-w-screen-2xl mx-auto py-16 lg:py-24 relative ">
    <div className="flex flex-col md:flex-row gap-2">
        <div className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col">
               
            {food.photos?.[0] && (
         <Image className="rounded-2xl object-cover aspect-square" src={food.photos?.[0]} alt=""/>
      )}
            </div>
        </div>
        <div className="flex flex-1">
            <div className="grid grid-cols-2 gap-2">
            {food.photos?.[1] && (
       <div>

<Image className="rounded-2xl  aspect-square" src={food.photos?.[1]} alt=""/>
       </div>
      )}
              <div>
              
              {food.photos?.[2] && (
        <Image className="rounded-2xl  aspect-square" src={food.photos?.[2]} alt=""/>
      )}
              </div>
              <div>
               
              {food.photos?.[3] && (
        <Image className="rounded-2xl  aspect-square" src={food.photos?.[3]} alt=""/>
      )}
              </div>
              <div>
       
              {food.photos?.[4] && (
        <Image className="rounded-2xl  aspect-square" src={food.photos?.[4]} alt=""/>
      )}
              </div>
            </div>
        </div>
    </div>
</div>
<h1 className='text-2xl  mb-5'> Ingredients: </h1>

<div className=''>
  <ul> {ing.map(ing => <li key={ing}> {ing} </li>)}</ul>
</div>
<div className="py-10">
<h1 className='text-2xl  mb-5'> Instructions</h1>
<h2 className='text-center'> {food.instructions} </h2>
</div>
{user && (
        <button onClick={addToFavorites} className="text-center py-2 px-6 rounded-full bg-primary text-white">
          Add To Favourite
        </button>
      )}
     <div className="py-16">
  <h1 className='text-2xl mb-5'>Comments:</h1>
  <Comments foodId={food._id} />

  <div className="anime__details__form mt-5">
   
  </div>
</div>

    </div>
    </>
  )
}
