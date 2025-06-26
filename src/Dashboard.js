import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Top from './Top';
import Bottom from './Bottom';
import download from './assets/download.jpeg'; // ✅ Make sure it exists
import i from './assets/i.jpeg';               // ✅ Confirm path
import im from './assets/im.jpeg';             // ✅ Confirm path

const imageMap = {
  SELVA: download,
  SRIRAM: i,
  PRAGATHES: im
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [podcasts, setPodcasts] = useState([]);
  const audioRefs = useRef({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    fetch('http://localhost:5000/api/podcasts')
      .then(res => res.json())
      .then(data => {
        const refs = {};
        data.forEach(p => {
          refs[p.id] = React.createRef();
        });
        audioRefs.current = refs;
        setPodcasts(data);

        console.log("Fetched podcasts:", data); // ✅ Debug
      })
      .catch(err => console.error('Error loading podcast data:', err));
  }, [navigate]);

  const toggleAudio = (id) => {
    const audio = audioRefs.current[id]?.current;
    if (audio) {
      audio.paused ? audio.play() : audio.pause();
    }
  };

  return (
    <>
      <Top />
      <div>
        <h1 className="w">SELVA's PodCasting Website</h1>

        <div className="g">
          {podcasts.map((podcast) => {
            const title = podcast.title?.toUpperCase();
            const imageSrc = imageMap[title] || download;

            return (
              <div className="q" key={podcast.id}>
                <h1>{podcast.title}</h1>

                <button className="p" onClick={() => toggleAudio(podcast.id)}>
                  <img
                    src={imageSrc}
                    alt="Profile"
                    className="n"
                    onError={(e) => {
                      e.target.src = download;
                      console.error(`Image not found for ${title}`);
                    }}
                  />
                </button>

                <h2>PodCast</h2>
                <audio
                  ref={audioRefs.current[podcast.id]}
                  className="v"
                  controls
                >
                  <source src={podcast.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>

                <button className="x" onClick={() => navigate('/collection')}>NEXTPAGE</button>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }} className="log">
          <button
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/');
            }}
            className="logout-btn"
          >
            LOGOUT
          </button>
        </div>
      </div>
      <Bottom />
    </>
  );
};

export default Dashboard;
