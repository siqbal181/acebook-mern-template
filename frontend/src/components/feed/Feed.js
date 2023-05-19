import React, { useEffect, useState, useContext } from 'react';
import Post from '../post/Post';
import CreatePostForm from '../createPost/CreatePostForm';
import {AuthenticationContext} from '../authenticationProvider/AuthenticationProvider';
import './Feed.css'

const Feed = () => {
  const {token, setToken} = useContext(AuthenticationContext)
  const [posts, setPosts] = useState([]);
  const [needsRefresh, setRefresh] = useState(false);


  useEffect(() => {
    if (token) {
      fetch("/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(async data => {
          setToken(data.token)
          setPosts(data.posts)
        })
    }
  }, [needsRefresh]) //Dependency - when needsRefresh (a boolean)
    // changes, it call for the useEffect to be rerun - refreshing the posts
    // pass () => setRefresh(true) to any component that needs to refresh and call it in the component
  
  const handlePostCreated = () => {
    setRefresh(!needsRefresh);
  }
  
  return(
    <div className="feed-container">
      <CreatePostForm onCreated={handlePostCreated}/> 
      <div id='feed' role="feed">
        {posts.map(
          (post) => ( <Post post={ post } key={ post._id } onCreated={handlePostCreated}/> )
        )}
      </div>
    </div>
  )
    
};

export default Feed;
