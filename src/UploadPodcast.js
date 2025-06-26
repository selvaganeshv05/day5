import React, { useState } from 'react';

const UploadPodcast = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [user, setUser] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!audioFile || !user || !title) {
      setMessage('All fields are required!');
      return;
    }

    const formData = new FormData();
    formData.append('audio', audioFile);
    formData.append('user', user);
    formData.append('title', title);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Upload successful!');
        console.log('Uploaded:', data);
      } else {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (err) {
      setMessage('❌ Upload failed');
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>🎙️ Upload Podcast</h2>
      <form onSubmit={handleUpload}>
        <div>
          <label>User:</label><br />
          <input type="text" value={user} onChange={(e) => setUser(e.target.value)} required />
        </div>
        <div>
          <label>Title:</label><br />
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Audio File (.mp3):</label><br />
          <input type="file" accept=".mp3" onChange={(e) => setAudioFile(e.target.files[0])} required />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Upload</button>
      </form>
      {message && <p style={{ marginTop: '15px' }}>{message}</p>}
    </div>
  );
};

export default UploadPodcast;
