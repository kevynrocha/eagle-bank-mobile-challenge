/* eslint-disable react/style-prop-object */
import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';

import Navigation from './src/navigation';
import store from './src/store/createStore';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor="#003573" style="light" />
      <SafeAreaView style={{ flex: 1 }}>
        <Navigation />
      </SafeAreaView>
      <FlashMessage position="bottom" />
    </Provider>
  );
};

export default App;
