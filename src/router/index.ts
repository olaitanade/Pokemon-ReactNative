import {NavigationContainerRef} from '@react-navigation/native';
import React from 'react';

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

let navigationIsReady = false;

function navigate(to: string, params?: any) {
  if (!!navigationIsReady && !!navigationRef.current) {
    navigationRef.current?.navigate(to, params);
  } else {
    //TODO: Exponential backoff
  }
}

function goBack() {
  if (!!navigationIsReady && !!navigationRef.current) {
    navigationRef.current?.goBack();
  } else {
    //TODO: Exponential backoff
  }
}

function setIsReady(isReady: boolean) {
  navigationIsReady = isReady;
}

function getRouteAttributes() {
  const currentRoute = navigationRef.current?.getCurrentRoute();

  if (!currentRoute) {
    return null;
  }
  const routeAttributes = {
    name: currentRoute.name,
    params: currentRoute.params,
  } as ScreenAttributes;

  return routeAttributes;
}

export default {
  navigate,
  goBack,
  navigationRef,
  setIsReady,
  getRouteAttributes,
};
