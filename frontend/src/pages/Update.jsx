/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import '../css/Write.css';
import Loading from './Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineCancel } from 'react-icons/md';

const Update = ({post, setToggle}) => {
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
    useEffect(() => {
      setValue(post.description);
      setTitle(post.title);
      setLink(post.img);
    }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newPost = {
      uid: currentUser.id,
      title:title,
      description: value,
      img: link,
      post_date: new Date().toISOString()
    };
    console.log(newPost);
    try {
      const res = await axios.put(`http://localhost:4000/posts/${post.id}`, newPost, {
        headers: { Authorization: `${currentUser.token}` },
      });
      toast.success('Blog Updated successfully, you can now view your blog on the HomePage', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
      // Navigate to the home page
      setLoading(false);
      setToggle(false)
      navigate('/');
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="update add">
      {loading && <Loading />}
      <div className="content">
        <h3>Update Post</h3>
        <input type="text" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <textarea
          className="editor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your text here..."
        ></textarea>
      </div>
      <div className="menu">
        <div className="item">
          <input
            style={{ outline: 'none', padding: '10px', borderRadius: '5px' }}
            type="text"
            value={link}
            placeholder="Image link"
            onChange={(e) => setLink(e.target.value)}
          />
          <div className="buttons">
            <button onClick={() => setToggle(false)}>Cancel</button>
            <button onClick={handleSubmit}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
