import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import moment from 'moment';
import { useNavigate, useLocation } from 'react-router-dom';

const Update = () => {
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [cat, setCat] = useState('');
  const [link, setLink] = useState('');
  const [postId, setPostId] = useState(null); // Track the post ID for updating
  const location = useLocation();

  const fetchPostData = async (postId) => {
    try {
      const res = await axios.get(`http://localhost:4000/posts/${postId}`);
      const postData = res.data;

      setValue(postData.description);
      setTitle(postData.title);
      setCat(postData.category);
      setLink(postData.img);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const postId = new URLSearchParams(location.search).get('edit');
    if (postId) {
      setPostId(postId);
      fetchPostData(postId);
    }
  }, [location.search]);

  return (
    
  );
};

export default Update;
