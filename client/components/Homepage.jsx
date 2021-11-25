import React from 'react';
import { Link } from 'react-router-dom';
export default function Homepage() {
  return (
    <div className="homeStyle">
      <div>
      <Link to="/login">
        <button id="loginbtn">Login </button>
        </Link>
        </div>
      <div>
      <Link to="/signup">
        <button id="signupbtn">Sign Up</button>
      </Link>
      </div>
    </div>
  );
}
