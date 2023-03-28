import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>Welcome to our Mental Health App</h1>
      <p>This app is designed to provide you with tools and resources to support your mental health and well-being.</p>
      <nav>
        {user ? (
          <ul>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        ) : (
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/join">Join</Link></li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Home;
