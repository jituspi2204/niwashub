import React from 'react';
import { ThemeProvider } from './src/theme/ThemeContext.tsx';
import { Provider } from 'react-redux';
import { store } from './src/store/store.ts';
import { NavigationContainer } from '@react-navigation/native';
import BootstrapProvider from './src/BootstrapProvider.tsx';
import { useEffect } from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { FIREBASE_WEB_API_KEY } from '@env';

const App: React.FC = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: FIREBASE_WEB_API_KEY,
    });
  }, []);
  return (
    <ThemeProvider>
      <Provider store={store}>
        <NavigationContainer>
          <BootstrapProvider />
        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
