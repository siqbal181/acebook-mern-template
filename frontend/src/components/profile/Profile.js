import { AuthenticationContext } from '../authenticationProvider/AuthenticationProvider';
import { useState, useContext, useEffect } from "react";

const UserProfile = ({ }) => {
  const [user, setUser] = useState("");
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
    setUser(data);
  };

  useEffect(() => {
    findUserProfile();
  }, [userId, token]);

  return (
    <div className="profile">
      <p>Hello</p>
    </div>
  );
};

export default UserProfile;
