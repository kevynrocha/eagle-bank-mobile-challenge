import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';

const { Navigator, Screen } = createStackNavigator();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: '#fafafa'
          }
        }}
      >
        <Screen name="Login" component={Login} />
        <Screen name="Home" component={Home} />
        <Screen name="Register" component={Register} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
