import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {ScreenReplaceTypes} from 'react-native-screens';
import navigation from 'router';
import routes from 'router/routes';
import bootloader from 'core/bootloader';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CommonActions} from '@react-navigation/native';
import Bootloader from 'modules/bootloader';
import {useStore} from 'core/state/store';
import Walkthrough from 'modules/walkthrough';

const BootloaderStackFactory = createNativeStackNavigator();
const WalkThroughStackFactory = createNativeStackNavigator();
const AppContainerStackFactory = createNativeStackNavigator();
const PokemonDetailStackFactory = createNativeStackNavigator();
const ContainerStackFactory = createNativeStackNavigator();

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
      {createRoute(routes.bootloader, Bootloader)}
    </AppContainerStackFactory.Navigator>
  );
};

const ContainerStack = () => {
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

const Container = () => {
  useEffect(() => {
    //initBackgroundFetch();
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
      <ContainerStack />
    </NavigationContainer>
  );
};

export default Container;
