import React from 'react';
import { ThemeProvider } from './src/theme/ThemeContext.tsx';
import { Provider } from 'react-redux';
import { store } from './src/store/store.ts';
import { NavigationContainer } from '@react-navigation/native';
import BootstrapProvider from './src/BootstrapProvider.tsx';
const App: React.FC = () => {
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
