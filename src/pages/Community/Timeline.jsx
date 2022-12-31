import React from 'react';
import { useSelector } from 'react-redux';

import Topbar from '../../components/Community/Topbar/Topbar';
import Feed from '../../components/Community/Feed/Feed';
import Sidebar from '../../components/Community/Sidebar/Sidebar';
import Rightbar from '../../components/Community/Rightbar/Rightbar';


import './Community.css';

const Timeline = () => {

    let user = useSelector((state) => (state.currentUserReducer));

  return (
    <div className = "endless">
        <Topbar />
        <div className="social-container">
            <div className="side-bar"><Sidebar /></div>
            <div className="right-bar-container">
              <Feed User={user}/>
              <Rightbar />
            </div>
        </div>
</div>
  )
}

export default Timeline