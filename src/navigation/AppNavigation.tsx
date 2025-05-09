import React, { useEffect } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '../theme/ThemeContext.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
import { logInUser } from '../features/auth/authSlice.ts';
import DashboardBottomTab from './DashboardBottomTab.tsx';
import AuthStack from './AuthStack.tsx';
import { LoadingView } from '../components';
import { BaseToast, ErrorToast, ToastConfig } from 'react-native-toast-message';
import Toast from 'react-native-toast-message';
import { Text, View } from '../components';

const AppNavigation: React.FC = () => {
  const theme = useTheme();

  const toastConfig: ToastConfig = {
    success: props => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'pink' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 14,
          fontWeight: '400',
          fontFamily: 'Satoshi-Regular',
        }}
      />
    ),
    error: props => (
      <ErrorToast
        {...props}
        style={{
          borderLeftWidth: 0,
          backgroundColor: theme.colors.background,
          flex: 1,
          position: 'absolute',
          width: '90%',
          elevation: 2,
          borderRadius: 10,
        }}
        text1Style={{
          fontSize: 14,
          fontFamily: 'Satoshi-Black',
          textAlign: 'center',
          color: theme.colors.danger500,
        }}
        text2Style={{
          fontSize: 12,
          fontFamily: 'Satoshi-Black',
        }}
      />
    ),
    tomatoToast: ({ text1, props }) => (
      <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
        <Text h5 n500>
          {text1}
        </Text>
        <Text h5 n600>
          {props.uuid}
        </Text>
      </View>
    ),
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />
      <Toast config={toastConfig} />
    </>
  );
};

export default AppNavigation;
