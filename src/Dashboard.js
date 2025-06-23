
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Top from './Top'; 
import Bottom from './Bottom';
import download from './download.jpeg'; 
import i from './i.jpeg'; 
import im from './im.jpeg'; 


function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://podcast.adobe.com/en')
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Top />
      <div>
        <h1 className='w'>SELVA's PodCasting Website</h1>
        <div className='g'>
          <div className='q'>
            <h1>SELVA</h1>
            <button className='p'><img src={download} alt="Profile" className='n' /></button>
            <h2>PodCast</h2>
          </div>
          <div className='q'>
            <h1>SRIRAM</h1>
            <button className='p'><img src={i} alt="Profile" className='n' /></button>
            <h2>PodCast</h2>
          </div>
          <div className='q'>
            <h1>PRAGATHES</h1>
            <button className='p'><img src={im} alt="Profile" className='n' /></button>
            <h2>PodCast</h2>
          </div>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name} - {user.email}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Dashboard;
