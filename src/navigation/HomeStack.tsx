import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddIncomeScreen from '../features/cashflow/screens/AddIncomeScreen.tsx';
import RecentTransactionsScreen from '../features/cashflow/screens/RecentTransactionsScreen.tsx';
import AddBillScreen from '../features/cashflow/screens/AddBillScreen.tsx';
import ProfileStack from './ProfileStack.tsx';
import HomeScreen from '../features/dashboard/screens/HomeScreen.tsx';
import { Header } from '../components';
import { colors } from '../theme/theme.ts';
import {
  getFocusedRouteNameFromRoute,
  NavigationProp,
  RouteProp,
} from '@react-navigation/native';
import { AuthStackParamList, DashboardStackParamList } from './types.ts';
import { useTheme } from '../theme/ThemeContext.tsx';

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

type HomeStackRouteProp = RouteProp<DashboardStackParamList, 'Home'>;
type HomeStackNavigationProp = NavigationProp<DashboardStackParamList, 'Home'>;
type Props = {
  route: HomeStackRouteProp;
  navigation: HomeStackNavigationProp;
};

const Stack = createNativeStackNavigator();
const HomeStack: React.FC<Props> = ({ route, navigation }) => {
  // const { colors } = useTheme();
  // React.useLayoutEffect(() => {
  //   const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeScreen';
  //   console.log('route ', route);
  //   if (routeName !== 'HomeScreen') {
  //     navigation.setOptions({
  //       tabBarStyle: { display: 'none' },
  //     });
  //   } else {
  //     navigation.setOptions({
  //       tabBarStyle: {
  //         display: 'flex',
  //         height: 70,
  //         elevation: 0,
  //         borderTopWidth: 0,
  //         backgroundColor: colors.n50,
  //       },
  //     });
  //   }
  // }, [navigation, route, colors]);
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
