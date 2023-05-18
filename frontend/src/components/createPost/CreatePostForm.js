import React, { useState, useContext } from 'react';
import {AuthenticationContext} from '../authenticationProvider/AuthenticationProvider';
import './CreatePostForm.css'

const CreatePostForm = ({ onCreated }) => {
  const {token, username} = useContext(AuthenticationContext)
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [imagePath, setImagePath] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append("image", imageUrl);

    console.log(formData)

    const image = await fetch('/uploadPhotos', {
      method: 'post',
      body: formData, 
    })

    let response = await fetch( '/posts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ message: message, author: username, imageUrl: `/images/${imagePath}`})
    })

    setMessage("")
    onCreated();
    setImageUrl(null);
  }

  const handleMessageChange = (event) => {
    setMessage(event.target.value)
  }

  const handleImageChange = (event) => {
    console.log(event.target.files[0])
    setImagePath(event.target.files[0].name.replace(/\s+/g, '-'))
    setImageUrl(event.target.files[0])
  }

    return (
      <>
      <form className="create-post-form" onSubmit={handleSubmit} id="postForm">
        <h1 className="make-post-title">Make a post</h1>
        <textarea className="create-post-input" rows="4" cols="50" placeholder='Write your post here...' id="message" value={ message } onChange={handleMessageChange} form="postForm"/>
        <input className="create-post-image-input" type="file" name="image" onChange={handleImageChange} />
        <input className="submit-button" role='submit-button' id='submit' type="submit" value="Submit" disabled={message=="" && imageUrl==null}/>
      </form>
      </>
    );
}

export default CreatePostForm;
