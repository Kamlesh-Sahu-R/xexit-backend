import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export function Home() {
  return (
    <div className="flex-container">
      <div className="home-container container">
        <h1 className="home-welcome-text">Welcome to XExit Application</h1>

        <div className="home-buttons">
          <Link to="/register">
            <button id="register-button" className="btn-block btn-primary">
              Register
            </button>
          </Link>

          <Link to="/login">
            <button id="login-button" className="btn-block btn-primary">
              Login
            </button>
          </Link>
        </div>

        <p>Please Register if you are new or Login if you're an existing employee</p>
      </div>
    </div>
  );
}
