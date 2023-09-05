import { Pokemon } from '../fetchPokemon';

const Result = ({ pokemon }: { pokemon: Pokemon | null }) => {
  if (!pokemon) return null;

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <h2>{pokemon.type}</h2>
      <p>{pokemon.description}</p>
    </div>
  );
};

export default Result;
