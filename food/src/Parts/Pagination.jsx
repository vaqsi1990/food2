import React from 'react';

export default function Pagination({ totalPosts, postsPerPage, paginate }) {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div  className='pagination'>
      {pages.map((p, index) => (
        <button key={index} onClick={() => paginate(p)}>
          {p}
        </button>
      ))}
    </div>
  );
}
