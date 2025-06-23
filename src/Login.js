import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Header from './Header';
import Footer from './Footer';
import Top from './Top';
import Bottom from './Bottom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setErrorMsg('');
      navigate('/dashboard');
    } else {
      setErrorMsg('Invalid username or password');
    }
  };

  return (
    <>
      <Top />
      <div className="Login">
        <Header />

        <input
          className="e1"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="e"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="d" onClick={handleLogin}>
          Login
        </button>

        {errorMsg && <p style={{ color: 'red', marginTop: '10px' }}>{errorMsg}</p>}

        <Footer />
      </div>
      <Bottom />
    </>
  );
}

export default Login;
