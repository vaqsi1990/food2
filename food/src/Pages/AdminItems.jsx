import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from '../Parts/Pagination';
import AccauntNav from '../Parts/AccauntNav';
import Image from '../Parts/Image';

export default function AdminItems() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(4);
  const [food, setFood] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('/allFood').then((res) => {
      setFood(res.data);
    });
  }, []);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredFood = food.filter((foodItem) =>
    foodItem.title.toLowerCase().includes(search.toLowerCase())
  );

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

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = filteredFood.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <div className='mt-[150px] mb-6'>
        <AccauntNav />
        <section className="container mx-auto py-10 md:py-20 antialiased">
          <section className="grid lg:grid-cols-2 2xl:grid-cols-4 grid-cols-1 gap-8">
            {currentPosts.map((food) => (
              <article key={food._id} className="mx-auto max-w-sm pb-8 bg-cover bg-center cursor-pointer transform duration-500 hover:-translate-y-1 shadow-2xl rounded-xl">
                <Link to={`/single/${food._id}`}>
                  {food.photos.length > 0 && (
                   <Image className="rounded-2xl object-cover aspect-square" src={food.photos?.[0]} alt=""/>
                  )}
                </Link>
                <h2 className="text-center text-[20px] mt-8 font-bold min-h-18 px-12">
                  {food.title}
                </h2>
                <div className="flex gap-2 justify-center">

                <Link Link to={'/account/food/'+food._id}
  type="button"
 
  className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
 Edit
</Link>
                <button
  type="button"
  onClick={() => deleteFood(food._id)}
  className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
  Delete
</button>
                </div>
              </article>
            ))}
          </section>
        </section>
        <Pagination totalPosts={filteredFood.length} postsPerPage={postPerPage} paginate={paginate} />
      </div>
    </>
  );
}
