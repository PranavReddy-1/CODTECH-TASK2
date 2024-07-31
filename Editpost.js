//EditPost.js//
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then(response => setPost(response.data))
      .catch(error => console.log(error));
  }, [id]);

  const updatePost = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/posts/${id}`, post);
      navigate(`/post/${id}`);
    } catch (error) {
      console.log('Error updating post:', error);
    }
  };

  return (
    <form onSubmit={updatePost}>
      <h1>Edit Post</h1>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Content</label>
        <textarea
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          required
        />
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default EditPost;