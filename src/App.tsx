import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Navigator from './Navigation';

const App = () => {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
};

export default App;
