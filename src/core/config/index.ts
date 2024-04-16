import RNConfig from 'react-native-config';

//app configuration
const config = {
  environment: RNConfig.ENV,
  api: {
    base: 'https://pokeapi.co/api/v2/',
    artwork:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/',
    version: 'v1',
    pageSize: 50,
  },
  hitSlop: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  },
  modalize: {
    duration: 400,
  },
};

export default config;
