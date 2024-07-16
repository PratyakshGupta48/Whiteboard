import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import Whiteboard from './Whiteboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route path="/board/:boardId" element={<Whiteboard/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
