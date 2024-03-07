import React, { useEffect, useState } from 'react'
import AccauntNav from '../Parts/AccauntNav'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Image from '../Parts/Image'
export default function Favourite() {
  const [fav, setFav] = useState([])

  console.log(fav);
  useEffect( () => {
    axios.get('/favourite')
    .then( res => setFav(res.data) )
  } )



 

  const remove = async(favouriteId) => {
    try {
      await axios.delete(`http://localhost:4500/remove-favourite/${favouriteId}`);
      setFav(fav.filter(item => item._id !== favouriteId));
      console.log('deleted');
     
    } catch (error) {
      console.error('Error delete:', error);
      throw error;
    }
 
  }

  return (
    <>
    <div className="text-center mt-[150px] h-[100vh]">
    <AccauntNav />
<div className="container my-12 mx-auto px-4 md:px-12">

    <div className='flex flex-wrap -mx-1 lg:-mx-4'>
     {
      fav?.length > 0 && fav.map( food => (
        <>
     
        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">

    <article className="overflow-hidden rounded-lg shadow-lg">
<>
        <Link to={`/single/${food._id}`}>

              
     
        {food.photos.length > 0 && (
                   <Image className="rounded-2xl object-cover aspect-square" src={food.photos?.[0]} alt=""/>
                )}
</Link>

<header className="flex justify-between items-center leading-tight p-2 md:p-4">
<h1 className="text-[15px]   ">
    {food.name}
</h1>
    <button className='py-1 px-6 rounded-full bg-primary mx-[70px]  text-[15px] text-white' onClick={() => remove(food._id)}>Delete</button>

</header>

</>

    </article>
      
    

    </div>
        
        </>
        
      ) )

     }
    </div>

</div>
    </div>
    </>
  )
}
