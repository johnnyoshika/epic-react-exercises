import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div>
        <Link to="/tic-tac-toe">TicTacToe</Link> |{' '}
        <Link to="/vanilla-tilt">VanillaTilt</Link> |{' '}
        <Link to="/fetching-pokemons">FetchingPokemons</Link> |{' '}
        <Link to="/safe-async">SafeAsync</Link>
      </div>
    </div>
  );
};

export default Home;
