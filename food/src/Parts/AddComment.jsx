import axios from 'axios';




const addComment = async (foodId, content,   userName) => {
  try {
    const response = await axios.post(`/comments/${foodId}`, { content,   userName });
    return response.data;
    
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};


export const deleteComment = async (foodId, commentId, userId) => {
  try {
    const response = await axios.delete(`/comments/${foodId}/${commentId}`, {
      params: { userId } 
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

export default addComment 


