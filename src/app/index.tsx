import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Container from 'router/container';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {StateProvider} from 'core/state/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

//setup react-query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

//wrap the app with the necessary providers - QueryClientProvider, StateProvider, SafeAreaProvider, GestureHandlerRootView
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StateProvider>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{flex: 1}}>
            <Container />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </StateProvider>
    </QueryClientProvider>
  );
};

export default App;
