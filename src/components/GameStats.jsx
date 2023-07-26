import React from 'react';

import './GameStats.css';

const GameStats = ({ gameStats }) => {
  const { level, points, PuyosExploded } = gameStats;

  return (
    <ul className="GameStats GameStats__right">
      <li>Level</li>
      <li className="value">{level}</li>
      <li>Points</li>
      <li className="value">{points}</li>
      <li>Chrono</li>
      <li className="value">0.0.00</li>
    </ul>
  );
};

export default React.memo(GameStats);
