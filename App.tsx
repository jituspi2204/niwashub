import React from 'react';
import { ThemeProvider } from './src/theme/ThemeContext.tsx';
import { Provider } from 'react-redux';
import { store } from './src/store/store.ts';
import { NavigationContainer } from '@react-navigation/native';
import BootstrapProvider from './src/BootstrapProvider.tsx';
import { useEffect } from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Platform} from 'react-native';
import { GOOGLE_WEB_CLIENT_ID_IOS, GOOGLE_WEB_CLIENT_ID_ANDROID } from './env';


const App: React.FC = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Platform.OS === 'ios' ? GOOGLE_WEB_CLIENT_ID_IOS : GOOGLE_WEB_CLIENT_ID_ANDROID,
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
