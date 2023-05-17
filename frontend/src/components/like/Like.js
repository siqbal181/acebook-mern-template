import React, { useEffect } from "react";
import { useState, useContext } from "react";
import {AuthenticationContext} from '../authenticationProvider/AuthenticationProvider';
import './Like.css'

const Like = ( { postId, liked, author } ) => {
  const [likedBy, setLikedBy] = useState(liked);
  const {token, username} = useContext(AuthenticationContext);

  const handleLikeClick = async () => {

    let response = await fetch(`/posts/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ username: username})
    })
    const data = await response.json();
    setLikedBy(data.post.likedBy)
  }

  return (
    <div className="like" >
      <button className="like-button" onClick={handleLikeClick} disabled={author===username}> 
        {likedBy.includes(username) ? "Dislike" : "Like"}
      </button>
      <p>{likedBy ? `${likedBy.length} likes by: ${likedBy.join(', ')}` : "0 likes"}</p>
    </div>
  )
}

export default Like;
