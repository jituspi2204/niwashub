import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecentTransactionsScreen from '../features/cashflow/screens/RecentTransactionsScreen.tsx';
import AddBillScreen from '../features/cashflow/screens/AddBillScreen.tsx';
import ProfileStack from './ProfileStack.tsx';
import HomeScreen from '../features/dashboard/screens/HomeScreen.tsx';
import { Header } from '../components';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { DashboardStackParamList } from './types.ts';
import VisitorStack from './VisitorStack.tsx';
import { useTheme } from '../theme/ThemeContext.tsx';
import RegisterResidentScreen from '../features/dashboard/screens/RegisterResidentScreen.tsx';
import UserSocietyScreen from '../features/dashboard/screens/UserSocietyScreen.tsx';

const getTitle = route => {
  switch (route) {
    case 'HomeScreen':
      return 'Home';
    case 'RegisterFlat':
      return 'Add Flat';
    case 'FlatList':
      return 'My Flats';
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
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
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
      <Stack.Screen
        name="RegisterFlat"
        component={RegisterResidentScreen}
        options={{ headerShown: true }}
      />

      <Stack.Screen
        name="FlatList"
        component={UserSocietyScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
