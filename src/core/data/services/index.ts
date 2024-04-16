import {QueryFunctionContext} from '@tanstack/react-query';
import api from '../api';

//pokemon list service
export const pokemonlist = ({pageParam}: {pageParam: string}) => {
  return api.pokemongo().list(pageParam);
};

//pokemon detail service
export const pokemondetail = ({
  queryKey,
}: QueryFunctionContext<[string, {id: string}]>) => {
  const [_key, {id}] = queryKey;
  return api.pokemongo().detail(id);
};

//pokemon species service
export const pokemonspecies = ({
  queryKey,
}: QueryFunctionContext<[string, {id: string}]>) => {
  const [_key, {id}] = queryKey;
  return api.pokemongo().species(id);
};

//pokemon evolution service
export const pokemonevolution = ({
  queryKey,
}: QueryFunctionContext<[string, {uri: string | undefined}]>) => {
  const [_key, {uri}] = queryKey;
  return api.pokemongo().evolution(uri as string);
};
