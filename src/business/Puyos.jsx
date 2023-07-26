const className = 'puyo';

export const PUYOS = {
  RED: {
    shape: [[1, 1]],
    className: `${className} ${className}__red`,
  },
  BLUE: {
    shape: [[1, 1]],
    className: `${className} ${className}__blue`,
  },
  GREEN: {
    shape: [[1, 1]],
    className: `${className} ${className}__green`,
  },
  YELLOW: {
    shape: [[1, 1]],
    className: `${className} ${className}__yellow`,
  },
};

export const randomPuyo = () => {
  const keys = Object.keys(PUYOS);
  const index = Math.floor(Math.random() * keys.length);
  const key = keys[index];
  return PUYOS[key];
};

export const rotate = ({ piece, direction }) => {
  // Pour une pièce Puyo Puyo, la rotation est simplement une permutation des cellules
  if (direction > 0) return [piece[0][1], piece[0][0]];
  return [piece[0][1], piece[0][0]];
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
