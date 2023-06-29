/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/authContext';
import '../css/Menu.css'

const Menu = ({category}) => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/posts/?category=${category}`, {
          headers: { Authorization : `${currentUser.token}`}
        });
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  },[]);
  return (
    <div className='menu'>
        <h1>Other posts you may like</h1>
        {posts.map((post) => (
            <div className="post" key={post.id}>
                <img src={post.img} alt="post" />
                <h2>{post.title}</h2>
            </div>
        ))}
    </div>
  )
}

export default Menu