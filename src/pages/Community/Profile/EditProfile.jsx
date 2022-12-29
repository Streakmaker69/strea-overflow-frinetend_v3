import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../../actions/users';
import { PermMedia,Cancel } from '@material-ui/icons';
import axios from 'axios';

import './Profile.css';

const EditProfile = ({ currentUser, setSwitched}) => {

    const [name, setName] = useState(currentUser?.message?.name);
    const [about, setAbout] = useState(currentUser?.message?.about);
    let [profilePicture] = useState(currentUser?.message?.profilePicture);
    let [coverPicture] = useState(currentUser?.message?.coverPicture);
    const [city, setCity] = useState(currentUser?.message?.city);
    const [from, setFrom] = useState(currentUser?.message?.from);
    const [relation, setRelation] = useState(currentUser?.message?.relationship);
    const [file, setFile] = useState(null);
    const [file2, setFile2] = useState(null);
    const url = 'https://streak-overflow-v2.adaptable.app';

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault()
        let relationship;
        if(relation.length === 0 || city.length === 0 || from.length === 0 ){
            dispatch(updateProfile(currentUser?.message?._id, { name, about,city: currentUser?.message?.city, from: currentUser?.message?.from , relationship: currentUser?.message?.relationship}))
        } else if(relation === 'married'){
            relationship = 2;
            dispatch(updateProfile(currentUser?.message?._id, { name, about,city, from, relationship }))
        }else if(relation === 'single'){
            relationship = 1;
            dispatch(updateProfile(currentUser?.message?._id, { name, about, city, from, relationship }))
        }
        setSwitched(false);
    }
    const handleCoverSubmit = async (e) =>{
        e.preventDefault();
        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("file", file);
            data.append("name", fileName);
            coverPicture = fileName;
            try {
                await axios.post(`${url}/upload/media`, data)
                dispatch(updateProfile(currentUser?.message?._id, { coverPicture: coverPicture }))
                console.log(coverPicture)
            } catch (error) {
                console.log(error);
            }
            setSwitched(false);
        }
    }
    const handleProfileSubmit = async (e) =>{
        e.preventDefault();
        if(file2){
            const data2 = new FormData();
            const file2Name = Date.now() + file2.name;
            data2.append("file", file2);
            data2.append("name", file2Name);
            profilePicture = file2Name;
            try {
                await axios.post(`${url}/upload/media`, data2)
                dispatch(updateProfile(currentUser?.message?._id, {  profilePicture: profilePicture }))
                console.log(profilePicture)
            } catch (error) {
                console.log(error);
            }
            setSwitched(false);
        }
    }




  return (
    <div className="edit-profile-container">
        <div className="edit-profile-details">
            <h1 className="edit-profile-title">
                Edit Profile Details
            </h1>
            <h2 className="edit-profile-title-2">
                Public Information
            </h2>
            <form className="edit-profile-form" onSubmit={handleSubmit}>
                <label htmlFor="name">
                    <h3>Display Name</h3>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label htmlFor="about">
                    <h3>About Me</h3>
                    <textarea id="about" cols="30" rows="10" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
                </label>
                <label htmlFor="city">
                    <h3>City</h3>
                    <input type="text" id="city" onChange={(e)=>setCity(e.target.value)}></input>
                </label><br />
                <label htmlFor="from">
                    <h3>From</h3>
                    <input type="text" id="from" onChange={(e)=>setFrom(e.target.value)}></input>
                </label><br />
                <label htmlFor="relationship">
                    <h3>Relationship</h3>
                    <p>Single/Married</p>
                    <input type="text" id="relationship" onChange={(e)=>setRelation(e.target.value.toLowerCase())}></input>
                </label><br />
                <input type="submit" value="Save Profile" className="user-submit-btn" />
                <button type="button" className="user-cancel-btn" onClick={() => setSwitched(false)}>Cancel</button>
            </form>
        </div>
        <div className="edit-cover-picture">
            <h2> Edit Cover & Display </h2>
            <form className="edit-share-bottom" onSubmit={handleCoverSubmit}>
                <div className="edit-share-option">
                    <label htmlFor="coverPicture" className="edit-shared">
                        <PermMedia htmlColor="tomato" className="edit-share-icon" />
                        <span className="edit-share-option-text">Cover</span>
                        <input type="file" id="imgfile" accept=".png,.jpg,.jpeg," className="edit-image-file" onChange={(e) => setFile(e.target.files[0])} />
                    </label>
                </div>
                <button className="edit-share-btn" type="submit">Upload</button>
            </form>
            {file && (
                <div className="edit-media-container">
                    <img src={URL.createObjectURL(file)} alt="" className="edit-media" />
                    <Cancel className="edit-cancel" onClick={() => setFile(null)}/>
                </div>
            )}
            <form className="edit-share-bottom" onSubmit={handleProfileSubmit}>
                <div className="edit-share-option">
                    <label htmlFor="profilePicture" className="edit-shared">
                        <PermMedia htmlColor="blue" className="edit-share-icon" />
                        <span className="edit-share-option-text">Profile Picture</span>
                        <input type="file" id="profilePicture" accept=".png,.jpg,.jpeg," className="edit-image-file" onChange={(e) => setFile2(e.target.files[0])} />
                    </label>
                </div>
                <button className="edit-share-btn" type="submit">Upload</button>
            </form>
            {file2 && (
                <div className="edit-media-container">
                    <img src={URL.createObjectURL(file2)} alt="" className="edit-media" />
                    <Cancel className="edit-cancel" onClick={() => setFile2(null)}/>
                </div>
            )}
        </div>
    </div>
  )
}

export default EditProfile