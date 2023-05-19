import React, { useState, useContext } from 'react';
import {AuthenticationContext} from '../authenticationProvider/AuthenticationProvider';
import UserProfile from '../profile/Profile';
import './LoginForm.css'
import globe from "./globe.png";

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {isLoggedIn, setIsLoggedIn, username, setUsername, token, setToken, userId, setUserId} = useContext(AuthenticationContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch( '/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })

    if(response.status !== 201) {
      console.log("oop")
      navigate('/login')
    } else {
      console.log("yay")
      let data = await response.json()
      setIsLoggedIn(true)

      const localUsername = await getUsername(email)
      setUsername(localUsername)

      setToken(data.token)
      setUserId(data.id)
      navigate('/posts');
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const getUsername = async (email) => {
    let response = await fetch( "/users/" + email, {
      method: 'get'
    }).then( (response) => response.json())

    return response.username;
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <img src={globe} alt="Transparent Globe" className='globe' />
      <h1>Log In</h1>
      <input className="login-input" placeholder='Email' id="email" type='text' value={email} onChange={handleEmailChange} />
      <input className="login-input" placeholder='Password' id="password" type='password' value={password} onChange={handlePasswordChange} />
      <input className="submit-button" role='submit-button' id='submit' type="submit" value="Submit" />
    </form>
  );
}

export default LogInForm;
