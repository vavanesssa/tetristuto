import { defaultCell } from '/src/business/Cell';
import { movePlayer } from '/src/business/PlayerController';
import { transferToBoard } from '/src/business/Puyos';
import explodeSfx from '../sounds/explode.mp3';
import clickSfx from '../sounds/click.mp3';

// Création d'une seule instance AudioContext pour gérer tous les sons
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

let explodeAudio;
let clickAudio;

// Fonction pour charger le fichier audio en tant qu'ArrayBuffer
// Cette fonction est utilisée pour charger les fichiers audio nécessaires pour les effets sonores du jeu
async function loadAudioFile(url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return arrayBuffer;
}

// Chargement des fichiers audio et conversion en AudioBuffers
// Cette promesse charge les fichiers audio nécessaires pour les effets sonores du jeu
Promise.all([loadAudioFile(explodeSfx), loadAudioFile(clickSfx)])
  .then(([explodeArrayBuffer, clickArrayBuffer]) => {
    // Décode les données audio en AudioBuffers
    audioContext.decodeAudioData(explodeArrayBuffer, (buffer) => {
      explodeAudio = buffer;
    });

    audioContext.decodeAudioData(clickArrayBuffer, (buffer) => {
      clickAudio = buffer;
    });
  })
  .catch((error) => {
    console.error('Erreur lors du chargement des fichiers audio:', error);
  });

// Fonction pour jouer un son
// Cette fonction est utilisée pour jouer les effets sonores du jeu
export const playSound = (buffer) => {
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start(0);
};

// Fonction pour construire le plateau de jeu
// Cette fonction est utilisée pour initialiser le plateau de jeu avec des cellules vides
export const buildBoard = ({ rows, columns }) => {
  const builtRows = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({ ...defaultCell })),
  );

  return {
    rows: builtRows,
    size: { rows, columns },
  };
};

// Fonction pour trouver la position de chute
// Cette fonction est utilisée pour trouver la position où le puyo doit tomber
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

// Fonction pour vérifier s'il y a un espace vide en dessous
// Cette fonction est utilisée pour vérifier si une cellule a un espace vide en dessous d'elle
const hasEmptySpaceBelow = (board, i, j) => {
  return i < board.length - 1 && !board[i + 1][j].occupied;
};

// Fonction pour déplacer le puyo vers le bas
// Cette fonction est utilisée pour déplacer un puyo vers le bas sur le plateau de jeu
const movePuyoDown = (board, i, j) => {
  const temp = board[i][j];
  board[i][j] = board[i + 1][j];
  board[i + 1][j] = temp;
  playSound(clickAudio);
};

// Fonction pour appliquer la gravité
// Cette fonction est utilisée pour appliquer la gravité sur le plateau de jeu, en déplaçant les puyos vers le bas tant qu'il y a un espace vide en dessous d'eux
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

// Fonction pour détecter les groupes
// Cette fonction est utilisée pour détecter les groupes de 4 ou plus puyos de la même couleur
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
          console.log(
            `Explosion de ${cells.length} puyos de la même couleur !`,
          );
          window.points = +window.points + 1;
          cells.forEach((cell) => {
            board[cell.i][cell.j] = { occupied: false, className: '' };
          });

          // Appliquer la gravité
          applyGravity(board);
        }
      }
    }
  }
}

// Fonction pour obtenir le prochain plateau
// Cette fonction est utilisée pour obtenir le prochain état du plateau de jeu après un mouvement du joueur
export const nextBoard = ({ board, player, resetPlayer }) => {
  const { puyo, position } = player;

  // Copier et effacer les espaces utilisés par les pièces qui
  // n'avaient pas encore collisionné et occupé les espaces de manière permanente
  let rows = board.rows.map((row) =>
    row.map((cell) => (cell.occupied ? cell : { ...defaultCell })),
  );

  // Position de chute
  const dropPosition = findDropPosition({
    board,
    position,
    shape: puyo.shape,
  });

  // Placer le fantôme
  const className = `${puyo.className} ${player.isFastDropping ? '' : 'ghost'}`;
  rows = transferToBoard({
    className,
    isOccupied: player.isFastDropping,
    position: dropPosition,
    rows,
    shape: puyo.shape,
  });

  // Placer la pièce.
  // Si elle a collisionné, marquer les cellules du plateau comme collisionnées
  if (!player.isFastDropping) {
    rows = transferToBoard({
      className: puyo.className,
      isOccupied: player.collided,
      position,
      rows,
      shape: puyo.shape,
    });
  }

  // Si nous avons collisionné, réinitialiser le joueur !
  if (player.collided || player.isFastDropping) {
    playSound(clickAudio);
    resetPlayer();
  }

  // Détecter les groupes de 4 ou plus cellules de la même couleur
  detectGroups(rows);

  // Appliquer la gravité
  applyGravity(rows);

  // Retourner le prochain plateau
  return {
    rows,
    size: { ...board.size },
  };
};

// Fonction pour vérifier s'il y a une collision
// Cette fonction est utilisée pour vérifier si un mouvement du joueur entraînerait une collision avec une autre pièce ou avec les limites du plateau de jeu
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

// Fonction pour vérifier si on est dans le plateau
// Cette fonction est utilisée pour vérifier si une pièce est entièrement à l'intérieur des limites du plateau de jeu
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
