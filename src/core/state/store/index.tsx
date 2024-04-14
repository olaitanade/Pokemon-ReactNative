import React, {createContext, useContext, useReducer} from 'react';

import {initialState, stateReducer} from '../reducer';

export const Store = createContext({} as StoreProps);

export const useStore = () => useContext(Store);

export const StateProvider = ({children}: ProviderProps) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  return <Store.Provider value={{state, dispatch}}>{children}</Store.Provider>;
};
