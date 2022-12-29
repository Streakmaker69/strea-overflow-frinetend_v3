import React, { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import axios from 'axios';

import { RssFeed, Chat} from '@material-ui/icons';
import Closefriends from '../Closefriends/Closefriends';

import './Sidebar.css';

const Sidebar = () => {
  const [userFriends, setUserFriends] = useState([]);
  let user = useSelector((state) => (state.currentUserReducer));
  useEffect(() =>{
    const fetchFriends = async () => {
      try{
        const fetchFriends = await axios.get(`https://streak-overflow-v2.adaptable.app/user/friend/` + user?.message?._id);
        setUserFriends(fetchFriends.data);
      }catch(error){
        console.log(error)
      }
    }
    fetchFriends();
  }, [user])
  return (
    <div className="side-bar-container">
      <div className="side-bar-wrapper">
        <ul className="side-bar-list">
          <li className="side-bar-list-item">
            <RssFeed className="side-bar-icon" />
            <Link to="/Community" style={{textDecoration: "none"}}><span className="side-bar-list-item-text">Feed</span></Link>
          </li>
          <li className="side-bar-list-item">
            <Chat className="side-bar-icon" />
            <Link to={`/Community/profile/${user?.message?.name}`} style={{textDecoration: "none"}}><span className="side-bar-list-item-text">Profile</span></Link>
          </li>
          {/* <li className="side-bar-list-item">
            <PlayCircleFilledOutlined className="side-bar-icon" />
            <span className="side-bar-list-item-text">Posts</span>
          </li> */}
        </ul>
        <hr className = "side-bar-hr"/>
        <ul className="side-bar-friend-list">

            <ul className="right-bar-friends-list">
          {userFriends?.map((friend) => (
            <Closefriends key={friend._id} user = {friend} />
          ))}
        </ul>

        </ul>
      </div>
    </div>
  )
}

export default Sidebar