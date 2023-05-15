import React, { useState, useContext } from 'react';
import {AuthenticationContext} from '../authenticationProvider/AuthenticationProvider';

const CreatePostForm = ({ onCreated }) => {
  const {token, username} = useContext(AuthenticationContext)
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append("image", imageUrl);

    const image = await fetch('/uploadImage', {
      method: 'post',
      body: formData
    })

    let response = await fetch( '/posts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ message: message, author: username })
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
    setImageUrl(event.target.files[0])
  }

    return (
      <>
      <form onSubmit={handleSubmit} id="postForm">
        <h1>Make a post</h1>
        <textarea rows="4" cols="50" placeholder='Write your post here...' id="message" value={ message } onChange={handleMessageChange} form="postForm"/>
        <input type="file" name="image" onChange={handleImageChange} />
        <input role='submit-button' id='submit' type="submit" value="Submit" />
      </form>
      </>
    );
}

export default CreatePostForm;
