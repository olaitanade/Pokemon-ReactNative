# Demo

<div align="center">
  <img src="./media/iphone.gif" width="32%"/>
</div>


---------------------------
# How to run the app

First you need to [Setup your environment](https://reactnative.dev/docs/environment-setup)

After setup complete ,run `yarn install` to build the dependencies the project needs.

## Structure

1. App: Main entry point
2. Assets: App resources
3. Components: Shared components amongst the modules. I used Tailwind setup with NativeWind.
4. Modules: A module is a screen with data and business logic to build features/components
5. Router: Navigation controller
6. Core: From the bootloader, config, data, hooks, state, strings, util and vault. The business logic required to run the app, using react-query for data, react-context for state and async-storage.

# Credits

This project uses the [PokéAPI](https://pokeapi.co). to obtain all the information that is shown in the app.

PokéAPI provides a RESTful API interface to highly detailed objects built from thousands of lines of data related to Pokémon.

This project got some inspiration for a part of the UI designs from [React-native-pokedex](https://github.com/DavidBarcenas/react-native-pokedex/tree/main?tab=readme-ov-file).

Image gotten from [Unsplash](https://unsplash.com/)

Pikachu Lottie animation from [lottiefiles](https://lottiefiles.com/)

