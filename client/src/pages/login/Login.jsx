import './login.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [credential, setCredential] = useState({
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredential(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({type: 'LOGIN_START'});
    navigate("/");
    try {
      const res = await axios.post(`http://localhost:8080/api/auth/login`, credential);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
    }

  };

  return (
    <div className='login'>
      <div className="lContainer">
        <input onChange={handleChange} type="email" placeholder='email' id='email' className="lInput" />
        <input onChange={handleChange} type="password" placeholder='password' id='password' className="lInput" />
        <button disabled={loading} onClick={handleClick} className="lButton">Login</button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
}

export default Login;