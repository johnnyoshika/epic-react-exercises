import reactLogo from './assets/react.svg';
import FetchingPokemons from './routes/FetchingPokemons';
import Home from './routes/Home';
import SafeAsync from './routes/SafeAsync';
import TicTacToe from './routes/TicTacToe';
import VanillaTilt from './routes/VanillaTilt';
import viteLogo from '/vite.svg';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

const App = () => {
  return (
    <div style={{ margin: '24px auto', width: '640px' }}>
      <div style={{ textAlign: 'center' }}>
        <img src={viteLogo} alt="Vite logo" />
        <img
          src={reactLogo}
          className="logo react"
          alt="React logo"
        />
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/vanilla-tilt" element={<VanillaTilt />} />
          <Route
            path="/fetching-pokemons"
            element={<FetchingPokemons />}
          />
          <Route path="/safe-async" element={<SafeAsync />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
