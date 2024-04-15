import axios, {AxiosInstance} from 'axios';
import RNConfig from 'react-native-config';
import {pokemon, pokemonspecies} from './route';

let instance: AxiosInstance;

function getInstance() {
  return (
    instance ??
    createInstance(RNConfig.BASE_URL ?? 'https://pokeapi.co/api/v2/')
  );
}

function createInstance(base: string) {
  const createdInstance = axios.create({
    baseURL: base,
  });

  return createdInstance;
}

//pokemon api
const pokemongo = () => {
  return {
    list: (uri: string) => getInstance().get<PokemonsResponse>(uri),
    detail: (id: string) =>
      getInstance().get<Pokemon>(pokemon.replace(':id', id)),
    species: (id: string) =>
      getInstance().get<Species>(pokemonspecies.replace(':id', id)),
    evolution: (uri: string) => getInstance().get(uri),
  };
};

function boot() {
  instance = getInstance();
}

const api = {
  boot,
  pokemongo,
};

export default api;
