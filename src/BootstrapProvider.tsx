import React, { useEffect } from 'react';
import AppNavigation from './navigation/AppNavigation.tsx';
import { bootstrapApi } from './api';
import { setBudgetCategories } from './reducers/bootstrapDataSlice.ts';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from './reducers/utilssSlice.ts';
import { LoadingView } from './components';
import DashboardBottomTab from './navigation/DashboardBottomTab.tsx';
import AuthStack from './navigation/AuthStack.tsx';
import { RootState } from './store/store.ts';
import { useTheme } from './theme/ThemeContext.tsx';
import { StatusBar } from 'react-native';
import { logInUser } from './features/auth/authSlice.ts';

const BootstrapProvider: React.FC = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const auth = useSelector((state: RootState) => state.auth);
  const loading = useSelector((state: RootState) => state.utils.loading);
  useEffect(() => {
    dispatch(
      setLoading({ active: true, message: 'initializing app for you...' }),
    );
    let startup = async () => {
      let data = await bootstrapApi.loadAppStartupData();
      dispatch(setBudgetCategories(data.budgetCategories));
      dispatch(logInUser(true));
    };
    startup().then(() => {
      dispatch(setLoading({ active: false, message: '' }));
    });
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      {loading.active ? (
        <LoadingView />
      ) : auth.loggedIn ? (
        <DashboardBottomTab />
      ) : (
        <AuthStack />
      )}
    </>
  );
};

export default BootstrapProvider;
