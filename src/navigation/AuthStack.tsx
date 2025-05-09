import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../features/auth/screens/LoginScreen';
import RegisterScreen from '../features/auth/screens/RegisterScreen.tsx';
import OtpVerificationScreen from '../features/auth/screens/OtpVerificationScreen.tsx';

const Stack = createNativeStackNavigator();
const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Otp" component={OtpVerificationScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
