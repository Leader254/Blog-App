/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import '../css/Single.css';
import { AuthContext } from '../context/authContext';
import { MdDeleteSweep } from 'react-icons/md';
import { MdEditNote } from 'react-icons/md';
import { AiFillLike } from 'react-icons/ai';
import { FcLike } from 'react-icons/fc';
import { PiHandsClapping } from 'react-icons/pi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './Update';

const Single = () => {
  const [likes, setLikes] = useState({
    like1: 0,
    like2: 0,
    like3: 0,
  });
  const [post, setPost] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const postId = location?.pathname?.split('/')[2];
  const { currentUser } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/posts/${postId}`);
      setPost([res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      if (!currentUser || !currentUser.token) {
        console.log('User is not authenticated');
        return;
      }

      const config = {
        headers: {
          Authorization: `${currentUser.token}`,
        },
      };

      const confirmed = window.confirm('Are you sure you want to delete this post?');
      if (confirmed) {
        const response = await axios.delete(`http://localhost:4000/posts/${postId}`, config);

        if (response.status === 200) {
          toast.success('Blog deleted successfully', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          navigate('/');
        } else {
          console.log('Failed to delete post');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const increaseCount = (key) => {
    setLikes((prevLikes) => {
      const newLikes = { ...prevLikes };
      newLikes[key] = prevLikes[key] + 1;
      localStorage.setItem(key, newLikes[key]);
      return newLikes;
    });
  };

  const extractTimeAndYear = (dateString) => {
    const regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}:\d{2}):\d{2}.\d{3}Z$/;
    const match = dateString.match(regex);
    if (match && match.length === 5) {
      const year = match[1];
      const month = match[2];
      const date = match[3];
      const time = match[4];
      return `${year}-${month}-${date} ${time}`;
    }
    return '';
  };

  const isPostOwner = currentUser && currentUser.id === post.uid;

  return (
    <div className="single">
      <div className="content">
        {post.map((post, index) => (
          <div className="post" key={index}>
            <img src={post.img} alt="Blog" />
            <div className="actions">
              <div className="edit">
                {
                  isPostOwner && (
                    <>
                      <MdEditNote style={{ fontSize: '25px', cursor: 'pointer' }} onClick={() => setToggle(true)} />
                      {toggle && <Update post={post} setToggle={setToggle} />}
                      <MdDeleteSweep style={{ fontSize: '25px', cursor: 'pointer' }} onClick={handleDelete} />
                    </>
                  )
                }
              </div>
              <div className="likes">
                <AiFillLike style={{ fontSize: '25px' }} onClick={() => increaseCount('like1')} />
                <span>{likes.like1}</span>
                <FcLike style={{ fontSize: '25px' }} onClick={() => increaseCount('like2')} />
                <span>{likes.like2}</span>
                <PiHandsClapping style={{ fontSize: '25px' }} onClick={() => increaseCount('like3')} />
                <span>{likes.like3}</span>
              </div>
            </div>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <p style={{ fontWeight: 'bold' }}>Posted at {extractTimeAndYear(post.post_date)}</p>
          </div>
        ))}
      </div>
      <Menu category={post.category} />
    </div>
  );
};

export default Single;
