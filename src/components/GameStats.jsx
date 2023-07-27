import React, { useState, useEffect } from 'react';
import './GameStats.css';
import { useStore } from '../hooks/useStore';
const GameStats = ({ gameStats }) => {
  const points = useStore((state) => state.points);

  const [chrono, setChrono] = useState(0);
  const [start, setStart] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setChrono(Date.now() - start);
      console.log(points);
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
      <li className="value">{points}</li>
      <li>Chrono</li>
      <li className="value">{formatChrono(chrono)}</li>
    </ul>
  );
};

export default React.memo(GameStats);
