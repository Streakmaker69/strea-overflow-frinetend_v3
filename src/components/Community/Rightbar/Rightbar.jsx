import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import birthday from '../../../assets/gift.png';
import Online from '../Online/Online';
import { Add, Remove } from '@material-ui/icons';

import './Rightbar.css';

const Rightbar = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const currentUser = useSelector((state) => (state.currentUserReducer));
  const [followed, setFollowed] = useState(false);
  const url = 'https://streak-overflow-v2.adaptable.app'

  useEffect(() => {
    setFollowed(currentUser?.message?.following.includes(user?.message?._id));
  }, [currentUser,user])

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = user ? await axios.get(`${url}/user/friend/` + user?._id) : axios.get(`${url}/user/friend/` + currentUser?.message?._id);
        setFriends(friendList.data);
      } catch (error) {
        console.log(error);
      }
    }
    getFriends();
  }, [user, currentUser])

  const handleFollow = async () => {
    try {
      if(followed){await axios.put(`${url}/user/unfollow/` + user?._id, { userId : currentUser?.message?._id})}
      else{await axios.put(`${url}/user/follow/` + user?._id, { userId : currentUser?.message?._id} )}
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
  }


  const HomeRigthBar = () => {
    useEffect(() =>{
      const fetchFriends = async () => {
        try{
          const fetchFriends = await axios.get(`${url}/user/friend/` + currentUser?.message?._id);
          setUserFriends(fetchFriends.data);
        }catch(error){
          console.log(error)
        }
      }
      fetchFriends();
    }, [])


    return(
      <div className="home-right-bar">
        <div className="birthday-container">
          <img className="birthday-img" src={birthday} alt="" />
          <span className="birthday-text"><b> Pola Foster </b> and <b>3 other friends</b> have a birthday today.</span>
        </div>
        <h4 className="right-bar-title">Online Friends</h4>
        <ul className="right-bar-friends-list">
          {userFriends?.map((friend) => (
            <Online key={friend._id} user = {friend} />
          ))}
        </ul>
      </div>
    );
  };

  const ProfileRightBar = () => {
    return(
      <>
        {user.name !== currentUser?.message?.name && currentUser &&  (
            <button className="right-bar-follow-btn" onClick={handleFollow}>
              {followed ? 'Remove Friend' : 'Add Friend'}
              {followed ? <Remove /> : <Add />}
            </button>
        )}
        <h4 className="right-bar-title-2">User Information</h4>
        <div className="right-bar-info">
          <div className="right-bar-info-items">
            <span className="right-bar-info-key">City: </span>
            <span className="right-bar-info-value">{user.city}</span>
          </div>
          <div className="right-bar-info-items">
            <span className="right-bar-info-key">From: </span>
            <span className="right-bar-info-value">{user.from}</span>
          </div>
          <div className="right-bar-info-items">
            <span className="right-bar-info-key">Relationship: </span>
            <span className="right-bar-info-value">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "-"}</span>
          </div>
        </div>
        <h4 className="right-bar-title-2">User Friends</h4>
        <div className="right-bar-followings">
          {friends.map((friend) => (
            <Link key={friend._id} to={"/Community/profile/"+friend.name} style={{ textDecoration: "none", fontWeight: "600"}}>
              <div className="right-bar-following">
                <img src={`${url}/download/${friend.profilePicture}`} alt="profilePicture" className="right-bar-following-img" />
                <span className="right-bar-following-name">{friend.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    )
  };

  return (
    <div className="right-bar-container">
      <div className="right-bar-wrapper">
        {user ? <ProfileRightBar /> : <HomeRigthBar />}
      </div>
    </div>
  )
}

export default Rightbar