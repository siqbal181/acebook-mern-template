import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';

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
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </Router>
    </div>
  );
}


export default Home;