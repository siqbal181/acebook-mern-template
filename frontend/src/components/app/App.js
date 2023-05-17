import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import ProtectedRoute from '../protectedRoute/ProtectedRoute'
import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Feed from '../feed/Feed'
import UserProfile from '../profile/Profile'
import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";
import {AuthenticationContext} from '../authenticationProvider/AuthenticationProvider';

const App = () => {
  const {isLoggedIn, setIsLoggedIn, username, setUsername, token, setToken, userId} = useContext(AuthenticationContext)
  return (
    <div>    
      <nav className="navbar">
        <ul className="navbar-nav">
          <div className="navbar-brand">Welcome To Acebook</div>
          {isLoggedIn ? 
            <>
              <li>Hello {username}</li>
              <li><Link to={`/profile/${userId}`}>Profile</Link></li>
              <li><Link to="/login" onClick={() => {setIsLoggedIn(false); setUsername(""); setToken("")}}>logout</Link> </li>
            </> : 
            <>
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          }
        </ul>
      </nav>
      <Routes>
        <Route path='/posts'  element={
          <ProtectedRoute>
            <Feed navigate={ useNavigate() }/>
          </ProtectedRoute>
        }/>
        <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
        <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
        <Route path='/profile/:userId' element={<UserProfile />} />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </div>
  );
}

export default App;
