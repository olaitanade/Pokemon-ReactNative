import {useInfiniteQuery} from '@tanstack/react-query';
import {pokemonlist} from '../services';

//pokemon list hook, reference: https://pokeapi.co/docs/v2#pokemon
//run infinite queries to fetch pokemon list with react-query
export const usePokemons = () => {
  const data = useInfiniteQuery({
    queryKey: ['pokemons'],
    queryFn: pokemonlist,
    initialPageParam: 'https://pokeapi.co/api/v2/pokemon?limit=50',
    getNextPageParam: (lastPage, _pages) => lastPage.data.next,
  });
  return {
    ...data,
  };
};
