import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddIncomeScreen from '../features/cashflow/screens/AddIncomeScreen.tsx';
import RecentTransactionsScreen from '../features/cashflow/screens/RecentTransactionsScreen.tsx';
import AddBillScreen from '../features/cashflow/screens/AddBillScreen.tsx';
import ProfileStack from './ProfileStack.tsx';
import HomeScreen from '../features/dashboard/screens/HomeScreen.tsx';
import { Header } from '../components';
import { colors } from '../theme/theme.ts';

const getTitle = route => {
  switch (route) {
    case 'AddIncome':
      return 'Add Income ';
    case 'AddBill':
      return 'Add Bill';
    default:
      return '';
  }
};

const HomeStack: React.FC = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: ({ route, navigation }) => (
          <Header
            type="secondary"
            style={{ backgroundColor: colors.background }}
            title={getTitle(route.name)}
            onPress={() => navigation.goBack()}
          />
        ),
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AddIncome" component={AddIncomeScreen} />
      <Stack.Screen name="AddBill" component={AddBillScreen} />
      <Stack.Screen
        name="RecentTransactions"
        component={RecentTransactionsScreen}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
