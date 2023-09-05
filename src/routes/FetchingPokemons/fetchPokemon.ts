export type Pokemon = {
  name: string;
  type: string;
  description: string;
};

const mockPokemonData: Partial<Record<string, Pokemon>> = {
  pikachu: {
    name: 'Pikachu',
    type: 'Electric',
    description:
      'It occasionally uses an electric shock to recharge a fellow Pikachu that is in a weakened state.',
  },
  charmander: {
    name: 'Charmander',
    type: 'Fire',
    description:
      'The flame on its tail indicates Charmander’s life force. If it is healthy, the flame burns brightly.',
  },
  charizard: {
    name: 'Charizard',
    type: 'Fire/Flying',
    description:
      'Charizard flies around the sky in search of powerful opponents. It breathes fire of such great heat that it melts anything.',
  },
  ninetales: {
    name: 'Ninetales',
    type: 'Fire',
    description:
      'Legend has it that Ninetales came into being when nine wizards possessing sacred powers merged into one. This Pokémon is highly intelligent; it can understand human speech.',
  },
};

export const fetchPokemon = (
  pokemonName: string,
): Promise<Pokemon> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // This emulates network delay
      // Simulate a network error with a 1/3 chance
      if (Math.random() < 1 / 3) {
        reject(new Error('Network Error'));
        return;
      }

      const data = mockPokemonData[pokemonName.toLowerCase()];
      if (data) resolve(data);
      else reject(new Error('Pokemon not found'));
    }, 1000); // simulated 1 second delay
  });
};
