const className = 'puyo';

// Définition des différents types de puyos
// Chaque type de puyo a une forme et une classe CSS spécifique
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

// Fonction pour générer un puyo aléatoire
// Cette fonction est utilisée pour générer un puyo de couleur aléatoire
export const randomPuyo = () => {
  const keys = Object.keys(PUYOS);
  const index = Math.floor(Math.random() * keys.length);
  const key = keys[index];
  return PUYOS[key];
};

// Fonction pour faire tourner un puyo
// Cette fonction est utilisée pour faire tourner un puyo dans une direction spécifiée
export const rotate = ({ piece, direction }) => {
  const currentShape = piece[0];

  // Si la direction est positive, la pièce est tournée dans le sens des aiguilles d'une montre
  // Si la direction est négative, la pièce est tournée dans le sens contraire des aiguilles d'une montre
  // La nouvelle forme de la pièce est déterminée en fonction de sa forme actuelle
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

// Fonction pour transférer un puyo au plateau de jeu
// Cette fonction est utilisée pour transférer un puyo du joueur au plateau de jeu
// Elle met à jour les cellules du plateau de jeu en fonction de la position et de la forme du puyo
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
