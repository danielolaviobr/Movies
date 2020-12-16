import {NavigationContainerRef, Route} from '@react-navigation/native';
import * as React from 'react';

export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(name: string, params?: object) {
  navigationRef.current?.navigate(name, params);
}

export function activeRoute(): Route<string, object> {
  return navigationRef.current?.getCurrentRoute();
}
