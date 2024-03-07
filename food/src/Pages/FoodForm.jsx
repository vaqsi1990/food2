import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import AccauntNav from '../Parts/AccauntNav';
import PhotoUploader from '../Parts/PhotoUploader';

export default function FoodForm() {
  const {id} = useParams()
  console.log(id);
    const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('')
  const [time, setTime] = useState(0);

  const navigate = useNavigate();

  useEffect( () => {
    if(!id) {
      return
    }
    axios.get('/food/' + id ).then( response => {
      const {data} = response
      setTitle(data.title)
      setIngredients(data.ingredients)
      setAddedPhotos(data.photos)
      setInstructions(data.instructions)
      setTime(data.time)
      setCategory(data.category)
    })
  }, [id] )
  


  

  async function addNewPlace(e) {
    e.preventDefault();
    
    try {
      if(id) {
        await axios.put('/food', {
          id,
          title,
          ingredients, 
          addedPhotos,
          instructions,
          time,
          category
        });
        navigate('/account/food');
      } else {

        await axios.post('/food', {
          title,
          ingredients, 
          addedPhotos,
          instructions,
          time,
          category
        });
        navigate('/account/food');
      }
    } catch (error) {
      console.error('Error adding food:', error);
    }
  }



  return (
    <>
    
    <div className="mt-[150px]">
    <AccauntNav />
    <form onSubmit={addNewPlace} className='mt-[50px]' action="">
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder='Title' />
      <textarea 
      value={ingredients.join('\n')} 
      onChange={e => {
      const newIngredients = e.target.value.split('\n').filter(Boolean);
      setIngredients(newIngredients);
      }} 
      placeholder='Ingredients' 
      />

     
     
      <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
      
        
        <textarea type="text" value={instructions} onChange={e => setInstructions(e.target.value)} placeholder='Instructions' />
        <input type="number" value={time} onChange={e => setTime(e.target.value)} placeholder='Cooking Time' />
      <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder='Category' />
      <button className="bg-primary w-[200px]  text-white font-bold py-2 px-4 rounded-full my-4">Save</button>
    </form>
  </div>
    </>
  )
}
