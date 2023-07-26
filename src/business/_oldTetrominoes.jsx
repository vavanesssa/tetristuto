const className = 'puyo';

export const PUYOS = {
  I: {
    shape: [[1], [1]],
    className: `${className} ${className}__i`,
  },
  J: {
    shape: [[1], [1]],
    className: `${className} ${className}__j`,
  },
  L: {
    shape: [[1], [1]],
    className: `${className} ${className}__l`,
  },
  O: {
    shape: [[1], [1]],
    className: `${className} ${className}__o`,
  },
  S: {
    shape: [[1], [1]],
    className: `${className} ${className}__s`,
  },
  T: {
    shape: [[1], [1]],
    className: `${className} ${className}__t`,
  },
  Z: {
    shape: [[1], [1]],
    className: `${className} ${className}__z`,
  },
};

export const randomPuyo = () => {
  const keys = Object.keys(PUYOS);
  const index = Math.floor(Math.random() * keys.length);
  const key = keys[index];
  return PUYOS[key];
};

export const rotate = ({ piece, direction }) => {
  // Transpose rows and columns
  const newPiece = piece.map((_, index) =>
    piece.map((column) => column[index]),
  );

  // Reverse rows to get a rotated matrix
  if (direction > 0) return newPiece.map((row) => row.reverse());

  return newPiece.reverse();
};

export const transferToBoard = ({
  className,
  isOccupied,
  position,
  rows,
  shape,
}) => {
  shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        const occupied = isOccupied;
        const _y = y + position.row;
        const _x = x + position.column;
        rows[_y][_x] = { occupied, className };
      }
    });
  });

  return rows;
};