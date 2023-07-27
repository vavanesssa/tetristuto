import { useState, useEffect } from 'react';

import { buildBoard, nextBoard } from '/src/business/Board';

export const useBoard = ({ rows, columns, player, resetPlayer, addPoints }) => {
  const [board, setBoard] = useState(buildBoard({ rows, columns }));

  useEffect(() => {
    setBoard((previousBoard) =>
      nextBoard({
        board: previousBoard,
        player,
        resetPlayer,
        addPoints,
      }),
    );
  }, [player, resetPlayer, addPoints]);

  return [board];
};
