import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import axios from 'axios';
import moment from 'moment';
import './Single.css'
import { AuthContext } from '../context/authContext';
import { MdDeleteSweep } from 'react-icons/md';
import { MdEditNote } from 'react-icons/md';
import { AiFillLike } from 'react-icons/ai';
import { FcLike } from 'react-icons/fc';
// import { FaHandsClapping } from 'react-icons/fa';
import { PiHandsClapping } from 'react-icons/pi';

const Single = () => {
  const [post, setPost] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const postId = location?.pathname?.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/posts/${postId}`);
      setPost([res.data]);
      // console.log(res.data)

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
        // User is not authenticated, handle accordingly
        console.log('User is not authenticated');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      };

      const response = await axios.delete(`http://localhost:4000/api/posts/${postId}`, config);

      if (response.status === 200) {
        // Post deleted successfully
        navigate("/");
      } else {
        // Handle unsuccessful delete attempt
        console.log('Failed to delete post');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='single'>
      <div className="content">
        {/* <img src={post.img} alt="Post" />
        <div className="user">
          {/* {post.userImg && <img src={post.userImg} alt="new" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser && currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`}>
                <img src={Edit} alt="edit" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="edit" />
            </div>
          )} 
        </div>
        <h1>{post.title}</h1>

        {post.description} */}
        {
          post.map((post, index) => (
            <div className="post" key={index}>
              <img src={post.img} />
              <div className="actions">
                <div className="edit">
                  <Link to={`/write?edit=2`}>
                    <MdEditNote style={{ fontSize: "25px" }} />
                    {/* <img src={Edit} alt="edit" /> */}
                  </Link>
                  <MdDeleteSweep style={{ fontSize: "25px", cursor: "pointer" }} onClick={handleDelete} />
                </div>
                <div className="likes">
                  <AiFillLike style={{ fontSize: "25px" }} />
                  <span>1</span>
                  <FcLike style={{ fontSize: "25px" }} />
                  <span>2</span>
                  <PiHandsClapping style={{ fontSize: "25px" }} />
                  <span>3</span>
                </div>
              </div>
              <h1>{post.title}</h1>
              <p>{post.description}</p>
              <p style={{ fontWeight: "bold" }}>Posted at {moment(post.date).fromNow()}</p>
            </div>
          ))
        }

      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
