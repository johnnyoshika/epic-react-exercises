import { useState } from 'react';
import { Pokemon, fetchPokemon } from './fetchPokemon';
import Form from './Form';
import Loading from './Loading';
import ErrorAlert from './ErrorAlert';
import Result from './Result';

const FetchingPokemons = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [state, setState] = useState<{
    data: Pokemon | null;
    loading: Boolean;
    error: { message: string } | null;
  }>({
    data: null,
    loading: false,
    error: null,
  });

  const handleSubmit = async () => {
    setState({
      data: null,
      loading: true,
      error: null,
    });
    try {
      const pokemon = await fetchPokemon(pokemonName);
      setState({
        data: pokemon,
        loading: false,
        error: null,
      });
    } catch (error) {
      const errorWithMessage: { message: string } =
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof error.message === 'string'
          ? { message: error.message }
          : { message: 'Unknown error' };

      setState({
        data: null,
        loading: false,
        error: errorWithMessage,
      });
    }
  };

  return (
    <div>
      {state.error && (
        <ErrorAlert error={state.error} handleRetry={handleSubmit} />
      )}
      {state.loading ? (
        <Loading />
      ) : (
        <Form
          pokemonName={pokemonName}
          setPokemonName={setPokemonName}
          handleSubmit={handleSubmit}
        />
      )}
      <Result pokemon={state.data} />
    </div>
  );
};

export default FetchingPokemons;
