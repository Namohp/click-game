import React from 'react';

const HighScore = ({ highScore }) => {
  return (
    <div className="high-score">
      <h2>Score: {highScore}</h2>
    </div>
  );
};

export default HighScore;
