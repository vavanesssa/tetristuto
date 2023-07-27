import { useState, useCallback } from 'react';
import { randomPuyo } from '/src/business/Puyos';

const buildPlayer = (previous) => {
  let puyos;

  if (previous) {
    puyos = [...previous.puyos];
    puyos.unshift(randomPuyo());
  } else {
    puyos = Array(5)
      .fill(0)
      .map((_) => randomPuyo());
  }

  return {
    collided: false,
    isFastDropping: false,
    position: { row: 0, column: 4 },
    puyos,
    puyo: puyos.pop(),
  };
};

export const usePlayer = () => {
  const [player, setPlayer] = useState(buildPlayer());

  const resetPlayer = useCallback(() => {
    setPlayer((prev) => buildPlayer(prev));
  }, []);

  return [player, setPlayer, resetPlayer];
};
