import './styles.css';
import Counter from './hooks/useStore';
import Game from '/src/components/Game';

export default function App() {
  return (
    <div className="App">
      <Counter />
      <Game rows={12} columns={6} />
    </div>
  );
}
