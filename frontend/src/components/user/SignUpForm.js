import React, { useState } from 'react';
import './SignUpForm.css';
import globe from "./globe.png";

const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); 
  const [imagePath, setImage] = useState(null);
  const [imageName, setImageName] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", imagePath);

    const image = await fetch('/uploadPhotos', {
      method: 'post',
      body: formData, 
    })

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password, username: username, profilePic: `/images/${imageName}` })
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

  const handleImageChange = (event) => {
    setImage(event.target.files[0])
    setImageName(event.target.files[0].name.replace(/\s+/g, '-'))
  }


    return (
      <form className="signup-form" onSubmit={handleSubmit}>
        <img src={globe} alt="Transparent Globe" className='globe' />
        <h1>Sign Up</h1>
          <input className="signup-input" placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
          <input className="signup-input" placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
          <input className="signup-input" placeholder="Username" id="username" type='text' value={ username } onChange={handleUsernameChange} />
          <input className="signup-input"  type="file" name="image" onChange={handleImageChange} />
          <input className="submit-button" id='submit' type="submit" value="Submit" />
      </form>
    );
}

export default SignUpForm;
