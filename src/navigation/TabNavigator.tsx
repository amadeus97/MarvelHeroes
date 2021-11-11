import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/Home';
import FavoriteHeroes from '../screens/FavoriteHeroes';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let iconName = '';

          switch (route.name) {
            case 'Home':
              iconName = 'view-dashboard';
              break;
            case 'Favorites':
              iconName = 'bookmark-multiple-outline';
              break;
            case 'Search':
              iconName = 'magnify';
            default:
              break;
          }

          return <Icon name={iconName} color={color} size={24} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          height: '10%',
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoriteHeroes}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Search"
        component={HomeScreen}
        options={{headerShown: false}}
        initialParams={{isSearching: true}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
