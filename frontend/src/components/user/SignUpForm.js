import React, { useState } from 'react';
import './SignUpForm.css';

const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password, username: username })
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/login')
        } else {
          navigate('/signup')
        }
      })
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleUsernameChange = (event) => { 
    setUsername(event.target.value) 
  }


    return (
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
          <input className="signup-input" placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
          <input className="signup-input" placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
          <input className="signup-input" placeholder="Username" id="username" type='text' value={ username } onChange={handleUsernameChange} />
          <input className="submit-button" id='submit' type="submit" value="Submit" />
      </form>
    );
}

export default SignUpForm;
