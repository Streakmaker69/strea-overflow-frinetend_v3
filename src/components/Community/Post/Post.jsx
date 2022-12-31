import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {DeleteOutline } from '@material-ui/icons';

import axios from 'axios';
import moment from 'moment';


import copy from 'copy-to-clipboard';
import heart from '../../../assets/heart.png';
import Send from '../../../assets/send.png';

import './Post.css';

const Post = ({ post, name }) => {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    let User = useSelector((state) => (state.currentUserReducer));
    const url = 'https://streak-overflow-v2.adaptable.app'

    useEffect(() => {
        setIsLiked(post.likes.includes(User?.message?._id))
    }, [User?.message?._id, post.likes])

    useEffect(() =>{
        const fetchUser = async () => {
          const res = await axios.get(`${url}/user?userId=${post.userId}`);
          setUser(res.data)
        }
        fetchUser();
      },[post.userId])
    const handleLike = () => {
        try {
            axios.put(`${url}/posts/like/` + post._id, { userId: User?.message?._id });
        } catch (error) {
            console.log(error);
        }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }
    const handleShare = () => {
        const surl = `${url}/Community/profile/${user.name}`
        copy(surl)
        alert("Link Copied to Clipboard : " + surl)
    }
    const handleDelete = async () => {
        try {
            await axios.delete( `${url}/posts/delete/${post._id}`, {data: { userId: User.message._id}} )
        } catch (error) {
            console.log(error);
        }
        window.location.reload();
    }

  return (
    <div className="posts-container">
        <div className="posts-wrapper">
            <div className="posts-top">
                <div className="posts-top-left">
                    <Link to={`/Community/profile/${user.name}`}><img className="posts-profile-img" src={`${url}/download/${user?.profilePicture}`} alt="" /></Link>
                    <span className="posts-user-name">{user.name}</span>
                    <span className="posts-date">posted {moment(post.createdAt).fromNow()}</span>
                </div>
                { (User?.message?._id === post?.userId) && (name === User?.message?.name) &&
                    (
                        <div className="posts-top-right">
                            <DeleteOutline onClick={handleDelete}  className="delete-post" />
                        </div>
                    )
                }
            </div>
            <div className="posts-center">
                <span className="posts-text">{post?.desc}</span>
                <img src={`${url}/download/${post?.img}`} alt="post" className="posts-img" />
            </div>
            {User &&
                <div className="posts-bottom">
                    <div className="posts-bottom-left">
                        <img className="heart-icon" src={heart} onClick={handleLike} alt="" />
                        <img className="send-icon" src={Send} onClick={handleShare} alt="" />
                        <span className="posts-like-counter">{like} people like it</span>

                    </div>
                    <div className="posts-bottom-right">
                        <span className="posts-comment-text">{post.comment} comments</span>
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default Post