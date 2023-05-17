import React from "react";
import { useState, useContext } from "react";
import {AuthenticationContext} from '../authenticationProvider/AuthenticationProvider';

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
    <div>
    <button onClick={handleLikeClick} disabled={author==username} className="button-main"> 
      {likedBy.includes(username) ? (
      <i className="fas fa-thumbs-down"></i> 
      ) : (
      <i className="fas fa-thumbs-up"></i>
    )}
    </button>
    <p>{likedBy.length} likes by: {likedBy.join(', ')}</p>
  </div>
  )
}

export default Like;
