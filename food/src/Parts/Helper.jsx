import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Helper({name,food}) {
    
    const addToFavorites = async () => {
       
        

       await axios.post('/add-to-favourite', {
        name: name,
        food: food._id
          
        });
    
      };
  return (
    <div>
      <button onClick={addToFavorites} className="bg-red-700 rounded-lg text-white text-xs text-center self-center px-3 py-2 my-2 mx-2">
  Add To Favourite</button>
    </div>
  )
}
