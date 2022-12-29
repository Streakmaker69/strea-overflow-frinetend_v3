import React from 'react';

import Feed from '../../../components/Community/Feed/Feed';
import Rightbar from '../../../components/Community/Rightbar/Rightbar';

import postpic from '../../../assets/post/3.jpeg';
import pic from '../../../assets/person/2.jpeg';

import './Profile.css';

const ProfileBio = ({ currentProfile, user }) => {
  const url = 'https://streak-overflow-v2.adaptable.app';
  return (
    <div className="profile-right">
          <div className="profile-right-top">
            <div className="profile-cover">
                <img className="profile-cover-img" src={`${url}/download/${currentProfile?.coverPicture}` || `${postpic}`} alt="Cover" />
                <img className="profile-user-img" src={`${url}/download/${currentProfile?.profilePicture}` || `${pic}`} alt="Profile" />
            </div>
            <div className="profile-info">
                <h4 className="profile-info-name">{currentProfile?.name}</h4>
                <span className="profile-info-desc">{currentProfile?.about}</span>
            </div>
          </div>
          <div className="profile-right-bottom">
            <div className="right-bottom-feed"><Feed picture={currentProfile?.profilePicture} name={currentProfile?.name}/></div>
            <div className="profile-right-bar"><Rightbar key={user._id} user={user} /></div>
          </div>
        </div>
  )
}

export default ProfileBio