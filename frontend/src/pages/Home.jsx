/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
// import { CgTrending } from 'react-icons/cg';
// import LeftSidebar from '../components/LeftSideBar';

const Home = () => {

  const [posts, setPosts] = useState([]);

  const cat = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/posts${cat}`);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [cat]);

  // Getting posts from server
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = await axios.get("http://localhost:4000/posts");
  //     setPosts(res.data);
  //   };
  //   fetchPosts();
  // },[]);

// Posts

  return (
    <>
    
    {/* <p style={{fontSize:"20px", display: "flex", alignItems:"center", gap: "4px"}}><CgTrending style={{border: "2px solid black", borderRadius: "50px", padding: "5px"}}/>Trending Today</p> */}
    <div className='home'>
      {/* <LeftSidebar /> */}
      <div className="posts">

        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={post.img} alt="" className="postImg" />
            </div>
            <div className="content">
              <Link to={`/post/${post.id}`} className='link'>
                <h1>{post.title}</h1>
              </Link>
              <p>{post.description.slice(0, 300)}...</p>
              {/* <a href=''>{post.url}</a> */}
              {/* <button>Read More</button> */}
              <Link to={`/post/${post.id}`} className='link'>
                <button>Read More</button>
              </Link>
            </div>

          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default Home