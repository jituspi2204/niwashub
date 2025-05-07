import React, {useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {useTheme} from '../theme/ThemeContext.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store.ts';
import {logInUser} from '../features/auth/authSlice.ts';
import DashboardStack from './DashboardStack.tsx';
import AuthStack from './AuthStack.tsx';

const AppNavigation: React.FC = () => {
    const theme = useTheme();
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logInUser(true));
    }, []);

    return (
        <>
            {auth.loggedIn ? <DashboardStack /> : <AuthStack />}
            <StatusBar
                barStyle="dark-content"
                backgroundColor={theme.colors.background}
            />
        </>
    );
};

export default AppNavigation;
