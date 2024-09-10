import React from 'react';

const History = ({ history }) => {
  return (
    <div className="history-box">
      <h3>History</h3>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            {entry.date} - {entry.time} - {entry.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
