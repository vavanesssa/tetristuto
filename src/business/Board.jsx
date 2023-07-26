import { defaultCell } from '/src/business/Cell';
import { movePlayer } from '/src/business/PlayerController';
import { transferToBoard } from '/src/business/Puyos';
import explodeSfx from '../sounds/explode.mp3';
const explodeAudio = new Audio(explodeSfx);

import clickSfx from '../sounds/click.mp3';
const clickAudio = new Audio(clickSfx);

export const playSound = (file) => {
  file.play();
};

export const buildBoard = ({ rows, columns }) => {
  const builtRows = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({ ...defaultCell })),
  );

  return {
    rows: builtRows,
    size: { rows, columns },
  };
};

const findDropPosition = ({ board, position, shape }) => {
  let max = board.size.rows - position.row + 1;
  let row = 0;

  for (let i = 0; i < max; i++) {
    const delta = { row: i, column: 0 };
    const result = movePlayer({ delta, position, shape, board });
    const { collided } = result;

    if (collided) {
      break;
    }

    row = position.row + i;
  }

  return { ...position, row };
};

const hasEmptySpaceBelow = (board, i, j) => {
  return i < board.length - 1 && !board[i + 1][j].occupied;
};

const movePuyoDown = (board, i, j) => {
  const temp = board[i][j];
  board[i][j] = board[i + 1][j];
  board[i + 1][j] = temp;
  playSound(clickAudio);
};

const applyGravity = (board) => {
  let moved;
  do {
    moved = false;
    for (let i = board.length - 2; i >= 0; i--) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].occupied && hasEmptySpaceBelow(board, i, j)) {
          movePuyoDown(board, i, j);
          moved = true;
        }
      }
    }
  } while (moved);
};

function detectGroups(board) {
  const visited = board.map((row) => row.map(() => false));
  const rows = board.length;
  const cols = board[0].length;

  function isValid(i, j) {
    return i >= 0 && i < rows && j >= 0 && j < cols;
  }

  function dfs(i, j, color) {
    if (
      !isValid(i, j) ||
      visited[i][j] ||
      !board[i][j].occupied ||
      board[i][j].className !== color
    ) {
      return [];
    }

    visited[i][j] = true;

    let cells = [{ i, j }];
    cells = cells.concat(dfs(i - 1, j, color));
    cells = cells.concat(dfs(i + 1, j, color));
    cells = cells.concat(dfs(i, j - 1, color));
    cells = cells.concat(dfs(i, j + 1, color));

    return cells;
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j].occupied && !visited[i][j]) {
        const cells = dfs(i, j, board[i][j].className);
        if (cells.length >= 4) {
          playSound(explodeAudio);
          console.log(`Explosion of ${cells.length} puyos of the same color!`);
          cells.forEach((cell) => {
            board[cell.i][cell.j] = { occupied: false, className: '' };
          });

          // Apply gravity
          applyGravity(board);
        }
      }
    }
  }
}

// ... (Rest of the code)

export const nextBoard = ({ board, player, resetPlayer }) => {
  const { puyo, position } = player;

  // Copy and clear spaces used by pieces that
  // hadn't collided and occupied spaces permanently
  let rows = board.rows.map((row) =>
    row.map((cell) => (cell.occupied ? cell : { ...defaultCell })),
  );

  // Drop position
  const dropPosition = findDropPosition({
    board,
    position,
    shape: puyo.shape,
  });

  // Place ghost
  const className = `${puyo.className} ${player.isFastDropping ? '' : 'ghost'}`;
  rows = transferToBoard({
    className,
    isOccupied: player.isFastDropping,
    position: dropPosition,
    rows,
    shape: puyo.shape,
  });

  // Place the piece.
  // If it collided, mark the board cells as collided
  if (!player.isFastDropping) {
    rows = transferToBoard({
      className: puyo.className,
      isOccupied: player.collided,
      position,
      rows,
      shape: puyo.shape,
    });
  }

  // If we collided, reset the player!
  if (player.collided || player.isFastDropping) {
    resetPlayer();
  }

  // Detect groups of 4 or more cells of the same color
  detectGroups(rows);

  // Apply gravity
  applyGravity(rows);

  // Return the next board
  return {
    rows,
    size: { ...board.size },
  };
};

export const hasCollision = ({ board, position, shape }) => {
  for (let y = 0; y < shape.length; y++) {
    const row = y + position.row;

    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] !== 0) {
        const column = x + position.column;

        if (
          column < 0 ||
          column >= board.size.columns ||
          row >= board.size.rows
        ) {
          return true;
        }

        if (row < 0) {
          continue;
        }

        if (board.rows[row][column].occupied) {
          return true;
        }
      }
    }
  }

  return false;
};

export const isWithinBoard = ({ board, position, shape }) => {
  for (let y = 0; y < shape.length; y++) {
    const row = y + position.row;

    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] !== 0) {
        const column = x + position.column;

        if (
          column < 0 ||
          column >= board.size.columns ||
          row >= board.size.rows
        ) {
          return false;
        }
      }
    }
  }

  return true;
};
