import React, { useState, useEffect } from 'react';
import './GameStats.css';

const GameStats = ({ gameStats }) => {
  const { level, points, PuyosExploded } = gameStats;
  const [points2, setPoints2] = useState(+window.points || 0); // convert window.points to a number
  const [chrono, setChrono] = useState(0);
  const [start, setStart] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints2(window.points);
      console.log(points2);
      setChrono(Date.now() - start);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [start]);

  const formatChrono = (ms) => {
    const totalSec = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSec / 60);
    const seconds = totalSec % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <ul className="GameStats GameStats__right">
      <li>Points</li>
      <li className="value">{points2}</li>
      <li>Chrono</li>
      <li className="value">{formatChrono(chrono)}</li>
    </ul>
  );
};

export default React.memo(GameStats);
