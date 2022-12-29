import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';

import Topbar from '../../../components/Community/Topbar/Topbar';
import Sidebar from '../../../components/Community/Sidebar/Sidebar';
import ProfileBio from './ProfileBio';
import EditProfile from './EditProfile';
// import Feed from '../../../components/Community/Feed/Feed';
// import Rightbar from '../../../components/Community/Rightbar/Rightbar';

// import postpic from '../../../assets/post/3.jpeg';
// import pic from '../../../assets/person/2.jpeg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({});
  const params = useParams();
  const username = params.name;
  useEffect(() =>{
    const fetchUser = async () => {
      const res = await axios.get(`https://streak-overflow-v2.adaptable.app/user?name=${username}`);
      setUser(res.data);
    }
    fetchUser();
  },[username])

  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter((user) => user.name === username )[0];
  const currentUser = useSelector((state) => state.currentUserReducer);

  const [switched, setSwitched] = useState(false)


  return (
    <div>
      <Topbar />
      <div className="profile-container">
        <div className="profile-left"><Sidebar /></div>
        <div className="whole-profile">
          { switched ? (
              <EditProfile currentUser={ currentUser } setSwitched={setSwitched} />
            ) : (
                <ProfileBio user={user} currentProfile={ currentProfile } />
            )}
          <div className="button-container">
            {
              currentUser?.message.name === username && (
                <button type="button" onClick={() => setSwitched(!switched)} className="edit-community-profile-btn">
                  <FontAwesomeIcon icon = { faPen } /> Edit Profile
                </button>
              )
            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default Profile