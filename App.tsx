import React from 'react';
import {ThemeProvider} from './src/theme/ThemeContext.tsx';
import AppNavigation from './src/navigation/AppNavigation.tsx';
import {Provider} from 'react-redux';
import {store} from './src/store/store.ts';
import {NavigationContainer} from '@react-navigation/native';
const App: React.FC = () => {
    return (
        <ThemeProvider>
            <Provider store={store}>
                <NavigationContainer>
                    <AppNavigation />
                </NavigationContainer>
            </Provider>
        </ThemeProvider>
    );
};

export default App;
