import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


import Post from '../../components/Community/Post/Post';
import Topbar from '../../components/Community/Topbar/Topbar';
import Sidebar from '../../components/Community/Sidebar/Sidebar';
import Rightbar from '../../components/Community/Rightbar/Rightbar';

import './Community.css';

const Home = () => {
  let user = useSelector((state) => (state.currentUserReducer));
  const [posts, setPosts] = useState([]);
  const url = 'https://streak-overflow-v2.adaptable.app'

  useEffect(() =>{
    const fetchPosts = async () => {
      const res = await axios.get(`${url}/posts/community/all`)
      setPosts(res.data.sort((p1,p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
    }
    fetchPosts();
  },[])
  return (
    <div className="home-container-community">
        {user === null ?
        <section>
          <Link to="/Auth" className="login-btn">Login</Link>
        </section>:
        <div className = "endless">
          <Topbar />
          <div className="social-container">
            <div className="side-bar"><Sidebar /></div>
            <div className="right-bar-container">
              <div className="feed-container-2">
                <div className="feed-wrapper">
                  {posts.map(p => (
                    <Post key={p._id} post={p} />
                  ))}
                </div>
              </div>
              <Rightbar />
            </div>
          </div>
        </div>
      }

    </div>
  )
}

export default Home