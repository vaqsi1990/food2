import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { User } from '../User';


export default function Comments({ foodId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState([]); 
    const { user } = useContext(User);
 
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/all-comments/${foodId}`);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [foodId]);


    

    const handleCommentDelete = async (commentId) => {
        try {
          await axios.delete(`http://localhost:4500/comments/${commentId}`);
          setComments(comments.filter(item => item._id !== commentId.toString()));
          console.log('Deleted comment with ID:', commentId);
        } catch (error) {
          if (error.response && error.response.status === 403) {
            console.error('Unauthorized - You can only delete your own comments');
           
          } else {
            console.error('Error deleting comment:', error);
         
          }
        }
      };

    const handleAddComment = async () => {
        try {
            const userName = user.name;
            const response = await axios.post(`/comments/${foodId}`, { userName, content: newComment });
            const newCommentData = response.data;
            setComments(prevComments => [...prevComments, newCommentData]);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };
    

    return (
        <div>
 
           <ul>
  {comments.map((comment) => (
    <div key={comment._id}>
                <div class="container mx-auto my-4 sm:px-20 flex justify-center">
  <div class="w-full  lg:w-5/12 mx-3 md:mx-0 lg:mx-0 border rounded bg-white overflow-hidden">

    <div class="px-4 pb-2">
      
      
      <div class="mb-2 pb-2  py-6">
        <div class="mb-2 text-sm flex flex-row items-center justify-between">
          <strong class="mr-2">{comment.user.name}：{comment.content}</strong>
          <span class="text-gray-400"></span>
          {(user && (comment.user._id === user._id || user.isAdmin)) && ( 
          <button className='py-1 px-6 rounded-full bg-primary  text-white' onClick={() => handleCommentDelete(comment._id)}>Delete</button>
        )}
        
        </div>
      </div>
      
      
    </div>
  </div>
</div>
      {/* <li className='flex flex-row justify-center gap-2 flex-center align-center'>
        <p>{comment.user.name}:</p>
        <p>{comment.content}</p>
       
        {(user && (comment.user._id === user._id || user.isAdmin)) && ( // Check if the comment belongs to the logged-in user or user is admin
          <button className='py-1 px-6 rounded-full bg-primary mb-5 text-white' onClick={() => handleCommentDelete(comment._id)}>Delete</button>
        )}
      </li> */}
    </div>
  ))}
</ul>


            {user && (
                <div className='py-7'>
                    <textarea
                        placeholder="Your Comment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    
                    <button onClick={handleAddComment}
            type="submit"
            className='inline-flex items-center gap-1 py-2 px-6 rounded-full bg-primary text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            Review
          </button>
                </div>
            )}
      
        </div>
    );
}
