import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { userApi } from './api';
import LoadingView from './components/LoadingView.tsx';
import { logInUser } from './features/auth/authSlice.ts';
import AuthStack from './navigation/AuthStack.tsx';
import ResidentBottomTab from './navigation/ResidentBottomTab.tsx';
import { RootState } from './store/store.ts';
import { useTheme } from './theme/ThemeContext.tsx';
import AdminBottomTab from './navigation/AdminBottomTab.tsx';
import GuardBottomTab from './navigation/GuardBottomTab.tsx';
import Toast, { ErrorToast } from 'react-native-toast-message';
import { WebSocketContext } from './context/webSocketContext.ts';
import { fonts } from './theme/theme.ts';
import { setActiveFlatId } from './reducers/flatSlice.ts';

const BootstrapProvider: React.FC = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const auth = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState<boolean>(false);
  const ws = useRef<any>(null);

  async function handleAuthStateChanged() {
    try {
      let [
        [key1, loginToken],
        [key2, newUser],
        [key3, role],
        [key4, activeFlat],
      ] = await AsyncStorage.multiGet([
        'login_token',
        'new_user',
        'role',
        'active_flat',
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
              role: role,
            }),
          );
          if (activeFlat != null) {
            dispatch(setActiveFlatId(activeFlat));
          }
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
          role: null,
        }),
      );
    } catch (error) {}
  }

  useEffect(() => {
    ws.current = new WebSocket(
      `ws://192.168.1.5:8000/chat?token=${auth.loginToken}`,
    );
    ws.current.onopen = () => {
      console.log('connected to server');
    };
  }, [auth]);

  useEffect(() => {
    setLoading(true);
    handleAuthStateChanged()
      .then(() => {
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
        });
      });
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      {loading ? (
        <LoadingView />
      ) : auth.loggedIn ? (
        <WebSocketContext.Provider value={ws.current}>
          {auth.role === 'RESIDENT' ? (
            <ResidentBottomTab />
          ) : auth.role === 'ADMIN' ? (
            <AdminBottomTab />
          ) : auth.role === 'GUARD' ? (
            <GuardBottomTab />
          ) : (
            <AuthStack />
          )}
        </WebSocketContext.Provider>
      ) : (
        <AuthStack />
      )}

      <Toast
        // visibilityTime={30000}
        config={{
          error: props => (
            <ErrorToast
              {...props}
              style={{
                backgroundColor: colors.subBackground,
                borderLeftWidth: 0,
                padding: 8,
                height: 'auto',
                paddingVertical: 16,
              }}
              text1Style={{
                ...fonts.base,
                color: 'red',
              }}
              text2Style={{
                ...fonts.base2,
                color: colors.n800,
                flexWrap: 'wrap',
              }}
            />
          ),
        }}
      />
    </>
  );
};

export default BootstrapProvider;
