import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios';

import Share from '../Share/Share';
import Post from '../Post/Post';

import './Feed.css';

const Feed = ({ User, name }) => {
  const url = 'https://streak-overflow-v2.adaptable.app'
  const [posts, setPosts] = useState([]);
  let user = useSelector((state) => (state.currentUserReducer));
  useEffect(() =>{
    const fetchPosts = async () => {
      const res = name ? await axios.get(`${url}/posts/profile/` + name ) : await axios.get(`${url}/posts/timeline/` + User?.message?._id);
      setPosts(res.data.sort((p1,p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
    }
    fetchPosts();
  },[ name, User ])
  return (
    <div className="feed-container">
      <div className="feed-wrapper">
        {(!name || name === user?.message?.name) && <Share pic={User?.message?.profilePicture} />}
        {posts.map(p => (
          <Post key={p._id} post={p} name={name} />
        ))}
      </div>
    </div>
  )
}

export default Feed