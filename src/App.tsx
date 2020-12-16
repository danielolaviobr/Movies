import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import Routes from './routes';
import {StatusBar} from 'react-native';
import store from './redux/store';
import BottomNavBar from './components/BottomNavBar';
import {navigationRef} from './services/navigationRef';
import {FavoritesProvider} from './hooks/favorites';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <FavoritesProvider>
          <StatusBar barStyle="light-content" />
          <Routes />
          <BottomNavBar />
        </FavoritesProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
