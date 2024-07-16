import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Whiteboard from './Whiteboard';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './UnderConstruction.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const createNewBoard = () => {
    const boardId = uuidv4();
    navigate(`/board/${boardId}`);
  };

  return (
    <div className="container">
      <div className="overlay"></div>
      <div className="stars" aria-hidden="true"></div>
      <div className="stars2" aria-hidden="true"></div>
      <div className="stars3" aria-hidden="true"></div>
      <main className="main">
        <section className="contact">
          <h1 className="title">Whiteboard</h1>
          <div className='sub-title' onClick={createNewBoard}>Create New Board</div>
        </section>
        {/* <section className="contact"> */}
          <div className='sub-title2' onClick={createNewBoard}>Made By : <a href='https://www.linkedin.com/in/pratyakshgupta48/'>Pratyaksh Gupta</a></div>
        {/* </section> */}
      </main>
    </div>
  );
};

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
