import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Explorer from '../screens/Explorer';
import Search from '../screens/Search';
import MovieDetails from '../screens/MovieDetails';
import Favorites from '../screens/Favorites';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#353637'},
      }}>
      <Stack.Screen name="Explorer" component={Explorer} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
    </Stack.Navigator>
  );
};

export default Routes;
