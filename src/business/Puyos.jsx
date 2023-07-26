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
  const currentShape = piece[0];

  if (direction > 0) {
    if (currentShape[0] === 1 && currentShape[1] === 1) {
      return [[1], [1]];
    } else if (currentShape[0] === 1 && currentShape[1] === 0) {
      return [[1, 1]];
    } else if (currentShape[0] === 0 && currentShape[1] === 1) {
      return [[1], [1]];
    } else {
      return [[1, 1]];
    }
  } else {
    if (currentShape[0] === 1 && currentShape[1] === 1) {
      return [[1], [1]];
    } else if (currentShape[0] === 1 && currentShape[1] === 0) {
      return [[1, 1]];
    } else if (currentShape[0] === 0 && currentShape[1] === 1) {
      return [[1], [1]];
    } else {
      return [[1, 1]];
    }
  }
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
