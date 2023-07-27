import './styles.css';

import Game from '/src/components/Game';

export default function App() {
  return (
    <div className="App">
      <Game rows={12} columns={6} />
    </div>
  );
}
