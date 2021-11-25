import React, { useState } from 'react';
import { Navigate } from 'react-router';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [full_name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loggedIn, setLogin] = useState(false);
  const [user_id, setUserId] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqOptions = {
      username: username,
      password: password,
      email: email,
      full_name: full_name,
    };
    const response = await axios.post(
      'http://localhost:3000/users/signup',
      reqOptions
    );
    if (response.data.error) error = response.data.error;
    if (response.data.user_id) {
      //TBD
      setLogin(true);
      setUserId(response.data.user_id);
      navigate('/maincontainer', { state: { user_id: response.data.user_id } });
    }
  };
  return (
    <div className="signupform">
      <h1>Sign Up </h1>
      <form onSubmit={handleSubmit}>
      <div>
        <label id="labelcss">Full Name</label>
        <input id="signupspacer"
          placeholder='Full Name'
          onChange={(e) => setName(e.target.value)}
        />
        </div>
        <div>
        <label id="labelcssemail">Email</label>
        <input  placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
        <label id="labelcss">Username</label>
        <input 
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <div>
        <label id="labelcss">Password{   }</label>
        <input 
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <button id="signupbtn2" type='submit'>Sign Up</button>
      </form>
      <p id="textcss"><br/>Already have an account?</p>
      <Link to='/login'>
      <button id="loginbtn">Login 
      </button>
      </Link>
      {/* <div>{error}</div> */}
    </div>
  );
}
export default Signup;
