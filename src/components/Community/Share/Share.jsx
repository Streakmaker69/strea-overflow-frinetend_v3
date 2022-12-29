import React, { useRef, useState }from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';


import { PermMedia, VideoLibrary, Cancel } from '@material-ui/icons';

import './Share.css';

const Share = ({pic}) => {

    const user = useSelector((state) => (state.currentUserReducer));
    const desc = useRef();
    const url = 'https://streak-overflow-v2.adaptable.app'

    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPost = {
            userId : user?.message?._id,
            desc: desc.current.value
        }
        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("file", file);
            data.append("name", fileName);
            newPost.img = fileName;
            try {
                await axios.post(`${url}/upload/media`, data)
            } catch (error) {
                console.log(error);
            }
        }

        try {
            await axios.post(`${url}/posts/create`, newPost);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }

    }


  return (
    <div className="share-container">
        <div className="share-wrapper">
            <div className="share-top">
                <Link to={`/Community/profile/${user?.message?.name}`}><img src={`${url}/download/${user?.message?.profilePicture}`} alt="profile pic" className="share-profile-img" /></Link>
                <input placeholder={`What's on your mind ${user?.message?.name}?`} className="share-input" ref={desc} />
            </div>
            <hr className="share-hr" />
            {file && (
                <div className="share-media-container">
                    <img src={URL.createObjectURL(file)} alt="" className="share-media" />
                    <Cancel className="share-cancel" onClick={() => setFile(null)}/>
                </div>
            )}
            <form className="share-bottom" onSubmit={handleSubmit}>
                <div className="share-options">
                    <label htmlFor="imgfile" className="share-option">
                        <PermMedia htmlColor="tomato" className="share-icon" />
                        <span className="share-option-text">Photo</span>
                        <input style={{display: "none"}} type="file" id="imgfile" accept=".png,.jpg,.jpeg," className="image-file" onChange={(e) => setFile(e.target.files[0])} />
                    </label>
                    <label htmlFor="vidfile" className="share-option">
                        <VideoLibrary htmlColor="blue" className="share-icon" />
                        <span className="share-option-text">Video</span>
                        <input style={{display: "none"}} type="file" id="vidfile" accept=".mp4,.webm,.mkv," className="video-file" onChange={(e) => setFile(e.target.files[0])} />
                    </label>
                    {/* <div className="share-option">
                        <Label htmlColor="green" className="share-icon" />
                        <span className="share-option-text">Tags</span>
                    </div> */}
                </div>
                <button className="share-btn" type="submit">Share</button>
            </form>
        </div>
    </div>
  )
}

export default Share