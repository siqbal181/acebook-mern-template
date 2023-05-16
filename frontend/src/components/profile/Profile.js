import { AuthenticationContext } from '../authenticationProvider/AuthenticationProvider';
import { useState, useContext, useEffect } from "react";

const UserProfile = ({ }) => {
  const [username, setUsername] = useState("");
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

  useEffect(() => {
    findUserProfile();
  }, [userId, token]);

  return (
    <div className="profile">
      <p>Hello {username}!</p>
    </div>
  );
};

export default UserProfile;
