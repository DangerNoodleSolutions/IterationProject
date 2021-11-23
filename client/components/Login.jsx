import React, { useState } from 'react';
import { Navigate } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLogin] = useState(false);
  let error;

  const submit = async (e) => {
    const reqOptions = { username: username, password: password };
    const response = await axios.get('/api/login', reqOptions);
    if (response.data.error) error = response.data.error;
    if (response.data.user_id) {
      //TBD
      setLogin(true);
    }
  };

  return loggedIn ? (
    <Navigate to='/maincontainer' />
  ) : (
    <div>
      <h1>Login</h1>
      <form onSubmit={submit}>
        <label>Username</label>
        <input type='text' onChange={(e) => setUsername(e.target.value)} />
        <label>Password</label>
        <input type='text' onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Log in</button>
      </form>
      <Link to='/signup'>Sign Up </Link>
      <div>{error}</div>
    </div>
  );
}
