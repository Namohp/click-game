import React from 'react';

const ScoreButton = ({ onClick }) => {
  return (
    <button className="score-button" onClick={onClick}>
      Click Here
    </button>
  );
};

export default ScoreButton;
