import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import HeroDetailsScreen from '../screens/HeroDetails';
import Character from '../types/character';

export type RootNavigatorParamList = {
  HomeTabs: undefined;
  Details: {hero: Character};
};

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomeTabs">
      <Stack.Screen
        name="HomeTabs"
        component={TabNavigator}
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

export default RootNavigator;
