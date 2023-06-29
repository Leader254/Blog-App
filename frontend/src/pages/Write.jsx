/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import '../css/Write.css';
import Loading from './Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Write = () => {
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [cat, setCat] = useState('');
  const [link, setLink] = useState('');
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newPost = {
      uid: currentUser.id,
      title,
      description: value,
      img: link,
      category: cat,
      post_date: new Date().toISOString()
    };
    console.log(newPost);
    try {
      const res = await axios.post('http://localhost:4000/posts', newPost, {
        headers: { Authorization: `${currentUser.token}` },
      });
      // console.log(res.data);
      // Reset the form values
      setValue('');
      setTitle('');
      setCat('');
      setLink('');
      toast.success('Blog published successfully, view your blog on the HomePage and be sure to make changes.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
      // Navigate to the home page
      setLoading(false);
      navigate('/');
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="add">
      {loading && <Loading />}
      <div className="content">
        <h3>Ready To Challenge Yourself🤞✌ Let's Blog</h3>
        <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <textarea
          className="editor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your text here..."
        ></textarea>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Categories</h1>
          <div className="cat">
            <input type="radio" name="category" value="Cars" id="cars" required onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="cars">Cars</label>
          </div>
          <div className="cat">
            <input type="radio" name="category" value="Science" id="science" required onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="category"
              value="Technology"
              id="technology"
              required
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="tech">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="category"
              value="Programming"
              id="programming"
              required
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="programming">Programming</label>
          </div>
          <div className="cat">
            <input type="radio" name="category" value="Travel" id="travel" required onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="travel">Travel</label>
          </div>
          <div className="cat">
            <input type="radio" name="category" value="Movies" id="movies" required onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="movies">Movies</label>
          </div>
        </div>
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ outline: 'none', padding: '5px', borderRadius: '5px' }}
            type="text"
            placeholder="Image link"
            onChange={(e) => setLink(e.target.value)}
          />
          <div className="buttons">
            <button>Save Draft</button>
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
