import { useContext, useEffect, useState } from 'react';
import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../context/authContext';

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const postId = location?.pathname?.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

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
        <img src={post.p_img} alt="Post" />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="new" />}
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
        {post.desc}
      </div>
      <Menu cat={post.cat}/>
    </div>
  );
};

export default Single;
