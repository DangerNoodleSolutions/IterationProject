import React from 'react';
import { Link } from 'react-router-dom';
export default function Homepage() {
  return (
    <div>
      <Link to="/login">
        <button>Login </button>
      </Link>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
    </div>
  );
}
