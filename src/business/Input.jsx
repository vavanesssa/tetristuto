export const Action = {
  Left: 'Left',
  FastDrop: 'FastDrop',
  Pause: 'Pause',
  Quit: 'Quit',
  Right: 'Right',
  Rotate: 'Rotate',
  SlowDrop: 'SlowDrop',
};

export const Key = {
  ArrowUp: Action.Rotate,
  ArrowDown: Action.SlowDrop,
  ArrowLeft: Action.Left,
  ArrowRight: Action.Right,
  KeyQ: Action.Quit,
  KeyP: Action.Pause,
  Space: Action.FastDrop,
};

export const actionIsDrop = (action) =>
  [Action.SlowDrop, Action.FastDrop].includes(action);

export const actionForKey = (key) => {
  switch (key) {
    case 'ArrowUp':
      return Action.Rotate;
    case 'ArrowRight':
      return Action.Right;
    case 'ArrowDown':
      return Action.FastDrop; // Change ici pour FastDrop
    case 'ArrowLeft':
      return Action.Left;
    case 'KeyP':
      return Action.Pause;
    case 'KeyQ':
      return Action.Quit;
    default:
      return null;
  }
};
