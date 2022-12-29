import React from 'react';

import './Online.css';

const Online = ({ user }) => {
  const url = 'https://streak-overflow-v2.adaptable.app'
  return (
    <div>
        <li className="right-bar-friend">
            <div className="right-bar-profile-img-container">
                <img className="right-bar-profile-img" src={`${url}/download/${user.profilePicture}`} alt="Prof" />
                <span className="right-bar-online"></span>
            </div>
            <span className="right-bar-username">{user.name}</span>
        </li>
    </div>
  )
}

export default Online