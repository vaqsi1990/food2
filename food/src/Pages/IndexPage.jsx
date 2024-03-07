import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Pagination from '../Parts/Pagination'
import Image from '../Parts/Image';

export default function IndexPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(6);
    const [food, setFood] = useState([]);
    const [search, setSearch] = useState('');
  
    useEffect(() => {
      axios.get('/allFood').then((res) => {
        setFood(res.data);
      });
    }, []);
  
    const handleSearch = (e) => {
      setSearch(e.target.value);
    };
  
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    const filteredFood = food.filter((foodItem) =>
      foodItem.title.toLowerCase().includes(search.toLowerCase())
    );
  
    const lastIndex = currentPage * postPerPage;
    const firstIndex = lastIndex - postPerPage;
  
    const currentPosts = filteredFood.slice(firstIndex, lastIndex);


  return (
    <>
     <section className="help-hero mt-[120px] relative">
            <div className="relativ image-layer ">
                <div className="help-hero-content mx-auto text-white">
                    <h1>Welcome to Our Food Blog</h1>
                    <p className='pe'>Explore a world of culinary delights with our collection of mouthwatering recipes and food inspiration!</p>
                   
                </div>
            </div>
        </section>
    
    
    <div className='mt-[200px]   '>
        
        <div className="container my-12 mx-auto px-4 md:px-12">
        <div className='flex justify-center mb-8'>
                <input
                    type='text'
                    placeholder='Search food...'
                    className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
                    value={search}
                    onChange={handleSearch}
                />
            </div>
    <div className="flex justify-center flex-wrap -mx-1 lg:-mx-4">

    {currentPosts.map((foodItem) => (
          <div key={foodItem._id} className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <Link to={`/single/${foodItem._id}`}>
              <article className="overflow-hidden rounded-lg shadow-lg">
              {foodItem.photos.length > 0 && (
                   <Image className="rounded-2xl object-cover aspect-square" src={foodItem.photos?.[0]} alt=""/>
                )}
                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                  <h1 className="text-lg">{foodItem.title}</h1>
                  <p className="text-grey-darker text-sm">Created by {foodItem.owner.name}</p>
                </header>
              </article>
            </Link>
          </div>
        ))}
        </div>
        <Pagination totalPosts={filteredFood.length} postsPerPage={postPerPage} paginate={paginate} />
    
    </div>

        
        
        </div>
    </>
  )
}
