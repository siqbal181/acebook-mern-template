import React, { useEffect } from "react";
import { useState, useContext } from "react";
import {AuthenticationContext} from '../authenticationProvider/AuthenticationProvider';

const Like = ( { postId, liked } ) => {

  const [likeCount, setLikeCount] = useState(liked.length); // declare likeCount before initializing it
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
    console.log(data)
    setLikedBy(data.post.likedBy)
    setLikeCount(data.post.likedBy.length);
  }

  return (
    <div>
    <button onClick={handleLikeClick}> 
      {likedBy.includes(username) ? "DISLIKE" : "LIKE"}
    </button>
    <p>{likeCount} likes</p> {/* use the likeCount state variable */}
    <p>liked by: {likedBy.join(', ')}</p>
  </div>
  )
}

export default Like;
