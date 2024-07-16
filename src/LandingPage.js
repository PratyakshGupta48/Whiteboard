import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const LandingPage = () => {
  const navigate = useNavigate();

  const createNewBoard = () => {
    const boardId = uuidv4();
    navigate(`/board/${boardId}`);
  };

  return (
    <div className="landing-page">
      <h1 style={{color:'#121212'}}>Create New Board</h1>
      <button onClick={createNewBoard}>Create New Board</button>
    </div>
  );
};

export default LandingPage;
