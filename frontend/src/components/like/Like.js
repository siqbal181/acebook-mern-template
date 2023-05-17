import React, { useEffect } from "react";
import { useState, useContext } from "react";
import {AuthenticationContext} from '../authenticationProvider/AuthenticationProvider';
import './Like.css'

const Like = ( { postId, likesCount } ) => {

  const [likeCount, setLikeCount] = useState(likesCount); // declare likeCount before initializing it
  const {token, setToken} = useContext(AuthenticationContext)

  const handleLikeClick = async () => {

    let response = await fetch(`/posts/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    const data = await response.json();
    console.log(data)
    setLikeCount(data.post.likedBy.length);
  }

  return (
    <div className="like" > 
      <button className="like-button" onClick={handleLikeClick}>Like</button>
      <p>{likeCount} likes</p> {/* use the likeCount state variable */}
    </div>
  )
}

export default Like;
