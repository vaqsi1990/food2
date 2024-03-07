import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { User } from '../User'
import axios from 'axios'
export default function SingleUser() {
    const {id} = useParams()
    const {user} =  useContext(User)
    const [food, setFood] = useState(null)
    useEffect( () => {
        if(!id) return
        axios.get(`/singleUser/${id}`)
        .then( response =>  setFood(response.data))
      }, [id] )
      console.log(food);
      return (
        <>
            <div className="mt-[150px]">
            <section class="container mx-auto py-10 md:py-20 antialiased ">
        <section class="grid lg:grid-cols-2 2xl:grid-cols-4 grid-cols-1 gap-8">
        {food && food.length > 0 && food.map ( food =>(
            <article class="mx-auto max-w-sm pb-8 bg-cover bg-center cursor-pointer transform duration-500 hover:-translate-y-1 shadow-2xl rounded-xl">
                        <Link to={`/single/${food._id}`}>

              

{food.photos.length > 0 && (
  
  <img alt="Placeholder" className=" " src={`http://localhost:4500/${food.photos[0]}`   } />
 )}
</Link>
             
                <h2 class="text-center text-[20px] mt-8 font-bold min-h-18 px-12">
                    {food.title}
                </h2>
               
            </article>

        ))}

            
        </section>
      
    </section>
              
            </div>
        </>
    )
    
}
