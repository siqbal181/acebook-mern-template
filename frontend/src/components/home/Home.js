import React from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import LoginForm from '../../auth/LoginForm';
import SignUpForm from '../../user/SignUpForm';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Acebook</h1>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
        <Route path="/signup" component={SignUpForm} />
        <Route path="/login" component={LoginForm} />
      </Router>
    </div>
  );
}

export default Home;
