import React, { useState, useContext } from 'react';
import {AuthenticationContext} from '../authenticationProvider/AuthenticationProvider';
import './CommentForm.css';

const CreateCommentForm = ({ onCreated, postId }) => {
  const [comment, setComment] = useState("");
  const {token} = useContext(AuthenticationContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch( '/comments', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ comment: comment, postId: postId })
    })

    setComment("")
    onCreated();
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

    return (
      <form className="comment-form" onSubmit={handleSubmit} id="commentForm" >
        <textarea className="comment-input" rows="2" cols="50" placeholder='Add a comment...' id="comment" value={ comment } onChange={handleCommentChange} form="commentForm"/>
        <input class="submit-button" role='submit-button' id='submit-comment' type="submit" value="Comment" disabled={(comment=="")}/>
      </form>
    );
}

export default CreateCommentForm;
