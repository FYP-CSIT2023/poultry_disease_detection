
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import your components here
import Home from './components/Home';
import About from './components/About';
import UploadButton from './components/upload';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/detect"
          element={<UploadButton buttonText="Upload Image" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
