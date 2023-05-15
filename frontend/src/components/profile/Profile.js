import { AuthenticationContext } from '../authenticationProvider/AuthenticationProvider';
import { useState, useContext } from "react";
import LoginForm from '../auth/LoginForm';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState("");
  const { token } = useContext(AuthenticationContext);

  const findUserProfile = async () => {
    let response = await fetch(`users/id/${userId}`, {
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

  return <div>{/* add JSX here */}</div>;
};

export default UserProfile;
