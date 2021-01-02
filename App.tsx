import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import Login from './src/pages/Login';

const App: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#003573" style="light" />
      <Login />
    </View>
  );
};

export default App;
