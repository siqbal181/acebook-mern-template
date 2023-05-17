import React, { useEffect, useState, useContext } from 'react';
import Post from '../post/Post';
import CreatePostForm from '../createPost/CreatePostForm';
import {AuthenticationContext} from '../authenticationProvider/AuthenticationProvider';
import './Feed.css'

const Feed = ({ navigate }) => {
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
          setRefresh(false);
        })
    }
  }, [needsRefresh]) //Dependency - when needsRefresh (a boolean)
    // changes, it call for the useEffect to be rerun - refreshing the posts
    // pass () => setRefresh(true) to any component that needs to refresh and call it in the component
  
  const handlePostCreated = () => {
    setRefresh(true);
  }
  
    if(token) {
      return(
        <>
        <div class="feed-container">
          <CreatePostForm onCreated={() => setRefresh(true)}/> 
          <div id='feed' role="feed">
              {posts.map(
                (post) => ( <Post post={ post } key={ post._id } onCreated={handlePostCreated}/> )
              )}
          </div>
         </div>
        </>
      )
    } else {
      navigate('/signin')
    }
};

export default Feed;
