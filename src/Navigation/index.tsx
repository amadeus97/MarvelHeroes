import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/Home';
import HeroDetailsScreen from '../screens/HeroDetails';
import Character from '../types/character';

export type NavigatorParamList = {
  Home: undefined;
  Details: {hero: Character};
};

const Stack = createNativeStackNavigator<NavigatorParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Details"
        component={HeroDetailsScreen}
        // options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
