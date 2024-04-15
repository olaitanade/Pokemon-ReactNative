import {useInfiniteQuery} from '@tanstack/react-query';
import {pokemonlist} from '../services';

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
