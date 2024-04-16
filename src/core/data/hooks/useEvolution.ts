/* eslint-disable react-hooks/exhaustive-deps */
import config from 'core/config';
import {Store} from 'core/state/store';
import {useContext, useEffect, useState} from 'react';

export type EvolutionProps = {
  name: string;
  level?: string;
  picture: string | null;
};

//evolution chain hook, reference: https://pokeapi.co/docs/v2#evolution-chains
//code reference: https://github.com/DavidBarcenas/react-native-pokedex
export const useEvolution = () => {
  const [evolutions, setEvolutions] = useState<EvolutionProps[]>([]);
  const {state} = useContext(Store);
  const {pokemon} = state;

  //map and transform evolution chain details to EvolutionProps
  const getEvolutions = () => {
    let evolutionChain = pokemon.evolution?.chain;

    do {
      if (evolutionChain) {
        const details = evolutionChain['evolution_details'][0];

        const urlSplit = evolutionChain.species?.url?.split('/');
        const id = urlSplit[urlSplit.length - 2];
        const picture = `${config.api.artwork}${id}.png`;

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
