import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import i from './assets/i.jpeg'; // Default image

const Collection = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/collections')
      .then((res) => res.json())
      .then((data) => setCollections(data))
      .catch((err) => console.error('Error loading collections:', err));
  }, []);

  const renderAudios = (episodes) => {
    return episodes.map((audioUrl, index) => (
      <div key={index} style={{ marginBottom: '10px' }}>
        <p style={{ margin: '5px 0' }}>🎙️ Episode {index + 1}</p>
        <audio controls style={{ width: '100%' }}>
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    ));
  };

  return (
    <div style={{ padding: '40px', background: '#f8f9fa', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', fontSize: '36px', marginBottom: '40px' }}>
        🎧 Podcast Collection
      </h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
        {collections.map((person, idx) => (
          <div
            key={idx}
            style={{
              width: '320px',
              background: '#fff',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              textAlign: 'center',
            }}
          >
            <img
              src={i}
              alt={person.name}
              style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <h2 style={{ margin: '15px 0 5px' }}>{person.name.toUpperCase()}</h2>
            <p style={{ color: '#555', marginBottom: '15px' }}>Podcasting • Life Lessons</p>
            {renderAudios(person.episodes)}
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            marginRight: '15px',
            color: 'white',
            backgroundColor: 'black',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          BACK TO DASHBOARD
        </button>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/');
          }}
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
};

export default Collection;
