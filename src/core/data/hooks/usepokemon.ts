/* eslint-disable react-hooks/exhaustive-deps */
import {useQuery} from '@tanstack/react-query';
import {Store} from 'core/state/store';
import {useContext, useEffect, useState} from 'react';
import {pokemondetail, pokemonevolution, pokemonspecies} from '../services';
import {mapToAbout} from 'core/util/utils';

export const usePokemon = (id: string) => {
  const {status: aboutStatus, data: aboutData} = useQuery({
    queryKey: ['pokemonAbout', {id}],
    queryFn: pokemondetail,
  });
  const {status: speciesStatus, data: speciesData} = useQuery({
    queryKey: ['pokemonSpecies', {id}],
    queryFn: pokemonspecies,
  });

  const evolutionChainUrl = speciesData?.data.evolution_chain.url;

  const {status: evolutionChainStatus, data: evolutionChainData} = useQuery({
    queryKey: ['pokemonevolution', {uri: evolutionChainUrl}],
    queryFn: pokemonevolution,
    enabled: !!evolutionChainUrl,
  });

  const {dispatch} = useContext(Store);
  const [status, setStatus] = useState<RequestStatus>('idle');
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    if (
      aboutStatus === 'success' &&
      speciesStatus === 'success' &&
      evolutionChainStatus === 'success'
    ) {
      dispatch({
        type: 'SET_ABOUT',
        payload: mapToAbout(aboutData.data, speciesData.data),
      });
      dispatch({type: 'SET_STATS', payload: aboutData.data.stats});
      dispatch({type: 'SET_EVOLUTION', payload: evolutionChainData.data});
      dispatch({type: 'SET_MOVES', payload: aboutData.data.moves});

      console.log('aboutData', aboutData.data);
      console.log('speciesData', speciesData.data);
      console.log('evolutionChainData', evolutionChainData.data);

      setPokemon(aboutData.data);
      setStatus('success');
    }
  }, [aboutStatus, speciesStatus, evolutionChainStatus, dispatch]);

  return {pokemon, status};
};
