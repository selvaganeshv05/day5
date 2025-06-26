import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Collection from './Collection'; // ✅ Make sure this import exists
import Login from './Login'; // assuming this exists

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/collection" element={<Collection />} /> {/* ✅ MUST exist */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
