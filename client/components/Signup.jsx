import React, { useState } from 'react';
import { Navigate } from 'react-router';
import axios from 'axios';
function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [full_name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loggedIn, setLogin] = useState(false);

  const submit = async (e) => {
    const reqOptions = {
      username: username,
      password: password,
      email: email,
      full_name: full_name,
    };
    const response = await axios.post('/api/login', reqOptions);
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
      <h1>Sign Up </h1>
      <form onSubmit={submit}>
        <label>Full Name</label>
        <input
          placeholder='Full Name'
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email</label>
        <input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
        <label>Username</label>
        <input
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type='submit'>Sign Up</button>
      </form>
      <div>{error}</div>
    </div>
  );
}
