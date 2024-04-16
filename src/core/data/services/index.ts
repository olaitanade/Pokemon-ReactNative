import {QueryFunctionContext} from '@tanstack/react-query';
import api from '../api';

export const pokemonlist = ({pageParam}: {pageParam: string}) => {
  return api.pokemongo().list(pageParam);
};

export const pokemondetail = ({
  queryKey,
}: QueryFunctionContext<[string, {id: string}]>) => {
  const [_key, {id}] = queryKey;
  return api.pokemongo().detail(id);
};

export const pokemonspecies = ({
  queryKey,
}: QueryFunctionContext<[string, {id: string}]>) => {
  const [_key, {id}] = queryKey;
  return api.pokemongo().species(id);
};

export const pokemonevolution = ({
  queryKey,
}: QueryFunctionContext<[string, {uri: string | undefined}]>) => {
  const [_key, {uri}] = queryKey;
  return api.pokemongo().evolution(uri as string);
};
