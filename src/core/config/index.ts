import RNConfig from 'react-native-config';

const config = {
  environment: RNConfig.ENV,
  api: {
    base: RNConfig.BASE_URL,
    artwork: RNConfig.POKEMON_SPRITE,
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
