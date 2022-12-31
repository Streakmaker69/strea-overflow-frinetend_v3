import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Search, Person, Chat, Notifications } from '@material-ui/icons';

import './Topbar.css';

const Topbar = () => {
    const user = useSelector((state) => (state.currentUserReducer));
  return (
    <div className="top-bar-container">
        <div className="top-bar-left">
            <Link to="/Community" style={{textDecoration: "none"}}><span className="logo">Social</span></Link>
        </div>
        <div className="top-bar-center">
            <div className="search-bar">
                <Search className="search-icon" />
                <input placeholder = "Search" className="search-input" />
            </div>
        </div>
        <div className="routes">
            <Link to="/Community" className="route">Home</Link>
            <Link to="/Community/timeline" className="route">Timeline</Link>
        </div>

        <div className="top-bar-right">
            {user &&
                <div className="top-bar-icons">
                    <div className="top-bar-icon-item">
                        <Person />
                        <span className="top-bar-icon-badge">
                            1
                        </span>
                    </div>
                    <div className="top-bar-icon-item">
                        <Chat />
                        <span className="top-bar-icon-badge">
                            2
                        </span>
                    </div>
                    <div className="top-bar-icon-item">
                        <Notifications />
                        <span className="top-bar-icon-badge">
                            1
                        </span>
                    </div>
                </div>
            }
                { user ? <Link to={`/Community/profile/${user?.message?.name}`}><img src={`https://streak-overflow-v2.adaptable.app/download/${user?.message?.profilePicture}`} alt="" className="top-bar-img" /></Link> : <Link to="/Auth" className="login-btn">Login</Link>}

        </div>

    </div>
  )
}

export default Topbar