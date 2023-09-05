import { useState } from 'react';

const Form = ({
  pokemonName,
  setPokemonName,
  handleSubmit,
}: {
  pokemonName: string;
  setPokemonName: (value: string) => void;
  handleSubmit: () => Promise<void>;
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="pokemon">Pokemon</label>
      <input
        type="text"
        value={pokemonName}
        onChange={e => setPokemonName(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Form;
