import React, { useState, useEffect } from 'react';
import HighScore from './components/HighScore';
import ScoreButton from './components/ScoreButton';
import History from './components/History';
import './App.css';

const App = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [timerActive, setTimerActive] = useState(false);

  // Load from history if any
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('scoreHistory')) || [];
    setHistory(storedHistory);
  }, []);

  

  const startTimer = () => {
    if (timerActive) return; 

    setTimerActive(true);
    setScore(0); 

    setTimeout(() => {
      setTimerActive(false);
    }, 10000);
  };

  // after timer ends
  useEffect(() => {
    if (!timerActive && score > 0) {
      const now = new Date();
      const newHistoryEntry = {
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        score: score,
      };

      const newHistory = [newHistoryEntry, ...history].sort((a, b) => b.score - a.score);
      setHistory(newHistory);
      localStorage.setItem('scoreHistory', JSON.stringify(newHistory));

      // Reset the score after updating
      setScore(0);
      setHighScore(0);
    }
  }, [timerActive]);



  const handleClick = () => {
    if (!timerActive) return; 

    const newScore = score + 10;
    setScore(newScore);

    if (newScore > highScore) {
      setHighScore(newScore);
    }
  };



  const handleReset = () => {
    setScore(0);
    setHighScore(0);
    setHistory([]);
    localStorage.removeItem('scoreHistory');
  };



  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div className="main-content">
        <button className="start-button" onClick={startTimer} disabled={timerActive}>
          {timerActive ? 'Timer Running' : 'Start Test'}
        </button>
        <HighScore highScore={highScore} />
        <ScoreButton onClick={handleClick} />
        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>
      </div>
      <History history={history} />
    </div>
  );
};

export default App;
