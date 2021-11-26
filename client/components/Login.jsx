import React, { useState } from 'react';
import { Navigate } from 'react-router';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLogin] = useState(false);
  const [user_id, setUserId] = useState('');
  let error;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqOptions = { username, password };
    const response = await axios.post('/users/login', reqOptions);
    if (response.data.error) error = response.data.error;
    if (response.data.user_id) {
      //TBD
      //console.log(response.data.user_id);
      console.log(user_id);
      setUserId(response.data.user_id);
      setLogin(true);
      navigate('/maincontainer', { state: { user_id: response.data.user_id } });
    }
  };

  // (
  //   <Navigate to='/maincontainer' user_id={5} />
  // )
  // return loggedIn ? (
  //   <Navigate to='/maincontainer' replace={true} state={user_id} />
  // ) :
  return (
    <div>
      <h1>Login</h1>
      <form className="loginform" onSubmit={handleSubmit}>
        <label id="labelcss">Username </label>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
        <label id="labelcss">Password </label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button id="loginbtn2" type="submit">
          Log in
        </button>
      </form>
      <p id="textcss">Don't have an account yet?</p>
      <Link to="/signup">
        <button id="signupbtn">Sign Up </button>
      </Link>
      <div>{error}</div>
    </div>
  );
}

export default Login;
