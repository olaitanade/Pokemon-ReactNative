module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'nativewind/babel',
    [
      'module-resolver',
      {
        alias: {
          app: './src/app',
          assets: './src/assets',
          core: './src/core',
          modules: './src/modules',
          theme: './src/theme',
          router: './src/router',
          components: './src/components',
        },
      },
    ],
    ['react-native-reanimated/plugin'],
  ],
};
