import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { userApi } from './api';
import LoadingView from './components/LoadingView.tsx';
import { logInUser } from './features/auth/authSlice.ts';
import AuthStack from './navigation/AuthStack.tsx';
import DashboardBottomTab from './navigation/DashboardBottomTab.tsx';
import { setLoading } from './reducers/utilssSlice.ts';
import { RootState } from './store/store.ts';
import { useTheme } from './theme/ThemeContext.tsx';

const BootstrapProvider: React.FC = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const auth = useSelector((state: RootState) => state.auth);
  const loading = useSelector((state: RootState) => state.utils.loading);

  async function handleAuthStateChanged() {
    try {
      let [[key1, loginToken], [key2, newUser]] = await AsyncStorage.multiGet([
        'login_token',
        'new_user',
      ]);
      if (loginToken) {
        const userDetails = await userApi.getUserDetails(loginToken);
        if (userDetails) {
          dispatch(
            logInUser({
              loggedIn: true,
              loginToken,
              id: userDetails.id,
              user: userDetails,
              newUser: newUser,
            }),
          );
          return;
        }
      }
      dispatch(
        logInUser({
          loggedIn: false,
          loginToken: '',
          id: '',
          user: {},
          newUser: false,
        }),
      );
    } catch (error) {}
  }

  useEffect(() => {
    dispatch(
      setLoading({ active: true, message: 'initializing app for you...' }),
    );
    handleAuthStateChanged()
      .then(() => {
        dispatch(setLoading({ active: false, message: '' }));
      })
      .catch(err => {
        dispatch(setLoading({ active: false, message: '' }));
      });
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      {loading.active ? (
        <LoadingView />
      ) : auth.loggedIn && !auth.newUser ? (
        <DashboardBottomTab />
      ) : (
        <AuthStack />
      )}
      {/* <AuthStack /> */}
    </>
  );
};

export default BootstrapProvider;
