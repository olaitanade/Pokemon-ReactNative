/* eslint-disable react-hooks/exhaustive-deps */
import {Store} from 'core/state/store';
import {useContext, useEffect, useState} from 'react';

export type EvolutionProps = {
  name: string;
  level?: string;
  picture: string | null;
};

export const useEvolution = () => {
  const [evolutions, setEvolutions] = useState<EvolutionProps[]>([]);
  const {state} = useContext(Store);
  const {pokemon} = state;

  const getEvolutions = () => {
    let evolutionChain = pokemon.evolution?.chain;

    do {
      if (evolutionChain) {
        const details = evolutionChain['evolution_details'][0];

        const urlSplit = evolutionChain.species?.url?.split('/');
        const id = urlSplit[urlSplit.length - 2];
        const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

        let evolution: EvolutionProps = {
          name: evolutionChain.species.name,
          level: !details?.min_level ? '' : details.min_level.toString(),
          picture: picture,
        };

        setEvolutions(prevState => [...prevState, evolution]);
        evolutionChain = evolutionChain['evolves_to'][0];
      }
    } while (!!evolutionChain && evolutionChain.hasOwnProperty('evolves_to'));
  };

  useEffect(() => {
    getEvolutions();
  }, []);

  return {evolutions};
};
