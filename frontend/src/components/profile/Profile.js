import { AuthenticationContext } from '../authenticationProvider/AuthenticationProvider';
import { useState, useContext, useEffect } from "react";
import LoginForm from '../auth/LoginForm';

const UserProfile = ({ userId, userName }) => {
  const [user, setUser] = useState("");
  const { token } = useContext(AuthenticationContext);

  const findUserProfile = async () => {
    let response = await fetch(`profile/${userId}`, {
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
  }, []);

  return (
    <div className="profile">
    </div>
  );
};

export default UserProfile;
