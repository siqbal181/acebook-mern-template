import { AuthenticationContext } from '../authenticationProvider/AuthenticationProvider';
import { useState, useContext, useEffect } from "react";

const UserProfile = () => {
  const [postData, setPostData] = useState([]); 
  const { token, username } = useContext(AuthenticationContext);


  const getPostsByUser = async () => {
    try {
      let response = await fetch(`/posts/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(async data => {
          setPostData(data.posts)
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPostsByUser();
  }, []); 

  return (
    <div className="profile" data-cy='userProfile'>
      <p className="user-welcome-message">Hello, {username}!</p>
      <div id='userposts' role="userposts" className="user-post-container">
        <p className="user-posts-heading">Here are your posts:</p>
        {postData.length > 0 ? (
          postData.map((post) => (
            <p key={post._id} className="user-post">{post.message}</p>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
};
export default UserProfile;
