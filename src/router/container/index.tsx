import React, {ReactElement, useCallback, useEffect, useRef} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {ScreenReplaceTypes} from 'react-native-screens';
import navigation from 'router';
import routes from 'router/routes';
import bootloader from 'core/bootloader';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Bootloader from 'modules/bootloader';
import {useStore} from 'core/state/store';
import Walkthrough from 'modules/walkthrough';
import {Pokemons} from 'modules/pokemons';
import {SearchPokemon} from 'modules/searchpokemon';
import {Host} from 'react-native-portalize';
import {PokemonDetail} from 'modules/pokemon';

//breat the app into different stacks - Bootloader, Walkthrough, App, Container
const BootloaderStackFactory = createNativeStackNavigator();
const WalkThroughStackFactory = createNativeStackNavigator();
const AppContainerStackFactory = createNativeStackNavigator();
const ContainerStackFactory = createNativeStackNavigator();

//create the BootloaderStack/SplashScreenStack
const BootloaderStack = () => {
  return (
    <BootloaderStackFactory.Navigator>
      <BootloaderStackFactory.Screen
        name={routes.bootloader}
        component={Bootloader}
        options={{headerShown: false}}
      />
    </BootloaderStackFactory.Navigator>
  );
};

//create the WalkThroughStack/OnboardingStack
const WalkThroughStack = () => {
  return (
    <WalkThroughStackFactory.Navigator>
      <WalkThroughStackFactory.Screen
        name={routes.walkthrough}
        component={Walkthrough}
        options={{headerShown: false}}
      />
    </WalkThroughStackFactory.Navigator>
  );
};

//create the AppStack
const AppStack = () => {
  const options = useRef({headerShown: false}).current;

  const createRoute = useCallback(
    (route: string, component: () => ReactElement) => {
      return (
        <AppContainerStackFactory.Screen
          name={route}
          component={component}
          options={options}
        />
      );
    },
    [options],
  );
  return (
    <AppContainerStackFactory.Navigator>
      {createRoute(routes.pokemons, Pokemons)}
      {createRoute(routes.searchpokemon, SearchPokemon)}
      {createRoute(routes.pokemondetail, PokemonDetail)}
    </AppContainerStackFactory.Navigator>
  );
};

//create the ContainerStack - this is the main stack that will be rendered
const ContainerStack = () => {
  //get the state from the store, initial route to switch between Bootloader, Walkthrough, App
  const {state} = useStore();
  const options = useRef({
    headerShown: false,
    replaceAnimation: 'push' as ScreenReplaceTypes,
  }).current;

  const createRoute = useCallback(
    (route: string, component: () => ReactElement) => {
      return (
        <ContainerStackFactory.Screen
          name={route}
          component={component}
          options={options}
        />
      );
    },
    [options],
  );

  return (
    <ContainerStackFactory.Navigator>
      {!state.initialroute &&
        createRoute(routes.bootloadercontainer, BootloaderStack)}
      {state.initialroute === 'Walkthrough' &&
        createRoute(routes.walkthroughcontainer, WalkThroughStack)}
      {state.initialroute === 'App' &&
        createRoute(routes.appcontainer, AppStack)}
    </ContainerStackFactory.Navigator>
  );
};

//Container component
//add a listener to the navigation container to set the isReady state and ref to the navigation container
const Container = () => {
  useEffect(() => {
    return () => {
      navigation.setIsReady(false);
      bootloader.shutdown();
    };
  }, []);

  return (
    <NavigationContainer
      ref={navigation.navigationRef}
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: DefaultTheme.colors.background,
        },
      }}
      onReady={() => {
        navigation.setIsReady(true);
      }}>
      <Host>
        <ContainerStack />
      </Host>
    </NavigationContainer>
  );
};

export default Container;
