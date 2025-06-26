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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Login successful!');
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setErrorMsg(data.message || '❌ Login failed');
      }
    } catch (err) {
      setErrorMsg('❌ Server error, try again later.');
    }
  };

  return (
    <div className='green'>
      <Top />
      <div className="Login">
        <Header />

        <h2 style={{ textAlign: 'center', marginBottom: '20px', border: '3px solid white', padding: '10px', borderRadius: '5px' }}>
          Please Login
        </h2>

        <input className="e1" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="e" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit" className="d" onClick={handleLogin}>Login</button>

        {errorMsg && <p style={{ color: 'red', marginTop: '10px', fontWeight: 'bold' }}>{errorMsg}</p>}
        
        <Footer />
      </div>
      <Bottom />
    </div>
  );
}

export default Login;
