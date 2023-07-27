// Définition des actions possibles dans le jeu
// Ces actions sont utilisées pour contrôler le mouvement et la rotation des puyos, ainsi que pour mettre le jeu en pause ou quitter le jeu
export const Action = {
  Left: 'Left',
  FastDrop: 'FastDrop',
  Pause: 'Pause',
  Quit: 'Quit',
  Right: 'Right',
  Rotate: 'Rotate',
  SlowDrop: 'SlowDrop',
};

// Mapping des touches du clavier aux actions
// Ce mapping est utilisé pour déterminer quelle action effectuer en fonction de la touche du clavier pressée par le joueur
export const Key = {
  ArrowUp: Action.Rotate,
  ArrowDown: Action.SlowDrop,
  ArrowLeft: Action.Left,
  ArrowRight: Action.Right,
  KeyQ: Action.Quit,
  KeyP: Action.Pause,
  Space: Action.FastDrop,
};

// Fonction pour vérifier si une action est un mouvement de chute
// Cette fonction est utilisée pour déterminer si une action est un mouvement de chute rapide ou lent
export const actionIsDrop = (action) =>
  [Action.SlowDrop, Action.FastDrop].includes(action);

// Fonction pour obtenir l'action correspondant à une touche
// Cette fonction est utilisée pour obtenir l'action à effectuer en fonction de la touche du clavier pressée par le joueur
export const actionForKey = (key) => {
  switch (key) {
    case 'ArrowUp':
      // Si la touche pressée est la flèche vers le haut, la pièce doit être tournée
      return Action.Rotate;
    case 'ArrowRight':
      // Si la touche pressée est la flèche vers la droite, la pièce doit être déplacée vers la droite
      return Action.Right;
    case 'ArrowDown':
      // Si la touche pressée est la flèche vers le bas, la pièce doit être déplacée rapidement vers le bas
      return Action.FastDrop;
    case 'ArrowLeft':
      // Si la touche pressée est la flèche vers la gauche, la pièce doit être déplacée vers la gauche
      return Action.Left;
    case 'KeyP':
      // Si la touche pressée est 'P', le jeu doit être mis en pause
      return Action.Pause;
    case 'KeyQ':
      // Si la touche pressée est 'Q', le jeu doit être quitté
      return Action.Quit;
    default:
      // Si la touche pressée ne correspond à aucune des touches mappées, aucune action n'est retournée
      return null;
  }
};
