import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useSelector } from 'react-redux';
import ChangePasswordScreen from '../features/auth/screens/ChangePasswordScreen.tsx';
import ForgotPasswordScreen from '../features/auth/screens/ForgotPasswordScreen.tsx';
import LoginScreen from '../features/auth/screens/LoginScreen';
import OtpVerificationScreen from '../features/auth/screens/OtpVerificationScreen.tsx';
import PersonalInfoScreen from '../features/auth/screens/PersonalInfoScreen.tsx';
import RegisterResidentScreen from '../features/auth/screens/RegisterResidentScreen.tsx';
import RegisterSocietyScreen from '../features/auth/screens/RegisterSocietyScreen.tsx';
import SignupScreen from '../features/auth/screens/SignupScreen.tsx';
import UserSocietyScreen from '../features/auth/screens/UserSocietyScreen.tsx';
import { RootState } from '../store/store.ts';

const Stack = createNativeStackNavigator();
const AuthStack: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={auth.loggedIn ? 'UserFlats' : 'Login'}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Otp" component={OtpVerificationScreen} />
      <Stack.Screen
        name="RegisterResident"
        component={RegisterResidentScreen}
      />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="UserFlats" component={UserSocietyScreen} />
      <Stack.Screen name="RegisterSociety" component={RegisterSocietyScreen} />
      <Stack.Screen name="Register" component={PersonalInfoScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
