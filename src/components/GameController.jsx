import './GameController.css';

import { Action, actionForKey, actionIsDrop } from '/src/business/Input';
import { playerController } from '/src/business/PlayerController';

import { useDropTime } from '/src/hooks/useDropTime';
import { useInterval } from '/src/hooks/useInterval';
import { useRef } from 'react';

const GameController = ({
  board,
  gameStats,
  player,
  setGameOver,
  setPlayer,
}) => {
  const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({
    gameStats,
  });

  useInterval(() => {
    handleInput({ action: Action.SlowDrop });
  }, dropTime);

  const inputRef = useRef(null);

  const onKeyUp = ({ code }) => {
    const action = actionForKey(code);
    if (actionIsDrop(action)) resumeDropTime();
  };

  const onKeyDown = ({ code }) => {
    const action = actionForKey(code);

    if (action === Action.Pause) {
      if (dropTime) {
        pauseDropTime();
      } else {
        resumeDropTime();
      }
    } else if (action === Action.Quit) {
      setGameOver(true);
    } else {
      if (action === Action.SlowDrop) {
        action = Action.FastDrop; // Change l'action SlowDrop en FastDrop
        pauseDropTime();
      }
      if (!dropTime) {
        return;
      }
      handleInput({ action });
    }
  };

  const handleInput = ({ action }) => {
    if (action === Action.FastDrop) {
      // Faites descendre la pièce rapidement
      playerController({
        action: Action.SlowDrop,
        board,
        player,
        setPlayer,
        setGameOver,
      });
    } else {
      playerController({
        action,
        board,
        player,
        setPlayer,
        setGameOver,
      });
    }
  };

  const handleBlur = () => {
    inputRef.current.focus();
  };

  return (
    <input
      ref={inputRef}
      className="GameController"
      type="text"
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onBlur={handleBlur}
      autoFocus
    />
  );
};

export default GameController;
