import React from 'react';

import'./Closefriends.css';

const Closefriends = ({user}) => {
  const url = 'https://streak-overflow-v2.adaptable.app'
  return (
    <div>
        <li className="side-bar-friend">
            <img className = "side-bar-friend-img" src={`${url}/download/${user.profilePicture}`} alt="close" />
            <span className="side-bar-friend-name">{user.name}</span>
        </li>
    </div>
  )
}

export default Closefriends