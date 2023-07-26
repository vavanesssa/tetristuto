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
  const index1 = Math.floor(Math.random() * keys.length);
  const index2 = Math.floor(Math.random() * keys.length);
  const key1 = keys[index1];
  const key2 = keys[index2];
  return { top: PUYOS[key1], bottom: PUYOS[key2] };
};

export const rotate = ({ piece, direction }) => {
  // Pour une pièce Puyo Puyo, la rotation dépend de la position actuelle de la pièce
  const currentShape = piece[0];

  if (direction > 0) {
    if (currentShape[0] === 1 && currentShape[1] === 1) {
      // Si la pièce est horizontale vers la droite, la rendre verticale vers le haut
      return [[1], [1]];
    } else if (currentShape[0] === 1 && currentShape[1] === 0) {
      // Si la pièce est verticale vers le haut, la rendre horizontale vers la gauche
      return [[1, 1]];
    } else if (currentShape[0] === 0 && currentShape[1] === 1) {
      // Si la pièce est horizontale vers la gauche, la rendre verticale vers le bas
      return [[1], [1]];
    } else {
      // Si la pièce est verticale vers le bas, la rendre horizontale vers la droite
      return [[1, 1]];
    }
  } else {
    if (currentShape[0] === 1 && currentShape[1] === 1) {
      // Si la pièce est horizontale vers la droite, la rendre verticale vers le bas
      return [[1], [1]];
    } else if (currentShape[0] === 1 && currentShape[1] === 0) {
      // Si la pièce est verticale vers le haut, la rendre horizontale vers la droite
      return [[1, 1]];
    } else if (currentShape[0] === 0 && currentShape[1] === 1) {
      // Si la pièce est horizontale vers la gauche, la rendre verticale vers le haut
      return [[1], [1]];
    } else {
      // Si la pièce est verticale vers le bas, la rendre horizontale vers la gauche
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
  const _shape = Array.isArray(shape[0]) ? shape : [shape];
  _shape.forEach((row, y) => {
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
