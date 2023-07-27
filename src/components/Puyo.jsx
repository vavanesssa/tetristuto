import './Puyo.css';

import Board from '/src/components/Board';
import GameController from '/src/components/GameController';
import GameStats from '/src/components/GameStats';
import Previews from '/src/components/Previews';

import { useBoard } from '/src/hooks/useBoard';
import { useGameStats } from '/src/hooks/useGameStats';
import { usePlayer } from '/src/hooks/usePlayer';

const Puyo = ({ rows, columns, setGameOver }) => {
  const [gameStats, addPoints] = useGameStats();
  const [player, setPlayer, resetPlayer] = usePlayer();
  const [board, setBoard] = useBoard({
    rows,
    columns,
    player,
    resetPlayer,
    addPoints,
  });

  return (
    <div className="Puyo">
      <Board board={board} />
      <GameStats gameStats={gameStats} />
      <Previews puyos={player.puyos} />
      <GameController
        board={board}
        gameStats={gameStats}
        player={player}
        setGameOver={setGameOver}
        setPlayer={setPlayer}
      />
    </div>
  );
};

export default Puyo;
