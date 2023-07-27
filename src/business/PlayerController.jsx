import { hasCollision, isWithinBoard } from '/src/business/Board';
import { rotate } from '/src/business/Puyos';
import { Action } from '/src/business/Input';

// Fonction pour tenter une rotation du puyo
// Cette fonction est utilisée pour effectuer une rotation du puyo si la rotation est valide
// Une rotation est valide si elle ne provoque pas de collision et si le puyo reste à l'intérieur du plateau de jeu
const attemptRotation = ({ board, player, setPlayer }) => {
  const shape = rotate({
    piece: player.puyo.shape,
    direction: 1,
  });

  const position = player.position;
  const isValidRotation =
    isWithinBoard({ board, position, shape }) &&
    !hasCollision({ board, position, shape });

  if (isValidRotation) {
    setPlayer({
      ...player,
      puyo: {
        ...player.puyo,
        shape,
      },
    });
  } else {
    return false;
  }
};

// Fonction pour déplacer le joueur
// Cette fonction est utilisée pour déplacer le puyo sur le plateau de jeu
// Elle vérifie si le mouvement est valide et met à jour la position du joueur en conséquence
export const movePlayer = ({ delta, position, shape, board }) => {
  const desiredNextPosition = {
    row: position.row + delta.row,
    column: position.column + delta.column,
  };

  const collided = hasCollision({
    board,
    position: desiredNextPosition,
    shape,
  });

  const isOnBoard = isWithinBoard({
    board,
    position: desiredNextPosition,
    shape,
  });

  const preventMove = !isOnBoard || (isOnBoard && collided);
  const nextPosition = preventMove ? position : desiredNextPosition;

  const isMovingDown = delta.row > 0;
  const isHit = isMovingDown && (collided || !isOnBoard);

  return { collided: isHit, nextPosition };
};

// Fonction pour tenter un mouvement
// Cette fonction est utilisée pour effectuer un mouvement si le mouvement est valide
// Elle met à jour l'état du joueur en fonction de l'action effectuée
const attemptMovement = ({ board, action, player, setPlayer, setGameOver }) => {
  const delta = { row: 0, column: 0 };
  let isFastDropping = false;

  if (action === Action.FastDrop) {
    isFastDropping = true;
  } else if (action === Action.SlowDrop) {
    delta.row += 1;
  } else if (action === Action.Left) {
    delta.column -= 1;
  } else if (action === Action.Right) {
    delta.column += 1;
  }

  const { collided, nextPosition } = movePlayer({
    delta,
    position: player.position,
    shape: player.puyo.shape,
    board,
  });

  const isGameOver = collided && player.position.row === 0;
  if (isGameOver) {
    setGameOver(isGameOver);
  }

  setPlayer({
    ...player,
    collided,
    isFastDropping,
    position: nextPosition,
  });
};

// Le contrôleur du joueur
// Cette fonction est utilisée pour contrôler le mouvement et la rotation du joueur en fonction de l'action effectuée
export const playerController = ({
  action,
  board,
  player,
  setPlayer,
  setGameOver,
}) => {
  if (!action) return;

  if (action === Action.Rotate) {
    attemptRotation({ board, player, setPlayer });
  } else {
    attemptMovement({ board, player, setPlayer, action, setGameOver });
  }
};
