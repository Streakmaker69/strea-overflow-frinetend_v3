import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Topbar from '../../components/Community/Topbar/Topbar';
import Sidebar from '../../components/Community/Sidebar/Sidebar';
import Feed from '../../components/Community/Feed/Feed';
import Rightbar from '../../components/Community/Rightbar/Rightbar';

import './Community.css';

const Home = () => {
  let user = useSelector((state) => (state.currentUserReducer));
  return (
    <div className="home-container-community">
      {user === null ? <div className="page-container"><Link to="/Auth" className="login-btn">Login</Link></div> :
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
      }

    </div>
  )
}

export default Home