import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IncomeScreen from '../features/income/screens/IncomeScreen.tsx';

const DashboardStack: React.FC = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Income" component={IncomeScreen} />
    </Stack.Navigator>
  )
};



export default DashboardStack;
