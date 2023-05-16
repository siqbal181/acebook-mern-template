import { AuthenticationContext } from '../authenticationProvider/AuthenticationProvider';
import { useState, useContext, useEffect } from "react";

const UserProfile = () => {
  const [username, setUsername] = useState("");
  const [postData, setPostData] = useState([]); 
  const { token, userId } = useContext(AuthenticationContext);

  const findUserProfile = async () => {
    let response = await fetch(`/profile/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUsername(data.username);
  };

  const getPostsByUser = async () => {
    try {
      let response = await fetch(`/posts/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const postData = await response.json();
      setPostData(postData); // Update the state with the retrieved posts
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    findUserProfile();
    getPostsByUser();
  }, [userId, token, username]); 

  return (
    <div className="profile" data-cy='userProfile'>
      <p>Hello {username}!</p>
      {console.log(postData)};
      <div id='userposts' role="userposts">
        <p>Here are your posts:</p>
        {postData.length > 0 ? (
          postData.map((post) => (
            <p key={post._id}>{post.message}</p>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
