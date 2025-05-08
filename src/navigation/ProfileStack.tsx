import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddIncomeScreen from '../features/cashflow/screens/AddIncomeScreen.tsx';
import RecentTransactionsScreen from '../features/cashflow/screens/RecentTransactionsScreen.tsx';
import AddBillScreen from '../features/cashflow/screens/AddBillScreen.tsx';
import ProfileHomeScreen from '../features/profile/screens/ProfileHomeScreen.tsx';
import MyAccountScreen from '../features/profile/screens/MyAccountScreen.tsx';
import PrivacyAndSecurityScreen from '../features/profile/screens/PrivacyAndSecurityScreen.tsx';
import FaqScreen from '../features/profile/screens/FaqScreen.tsx';
import { Header } from '../components';
import { colors } from '../theme/theme.ts';

const getTitle = route => {
  switch (route) {
    case 'ProfileHome':
      return 'Profile ';
    case 'MyAccount':
      return 'My Account';
    case 'Faq':
      return 'FAQs';
    case 'PrivacyAndSecurity':
      return 'Privacy and Security';
  }
};

const ProfileStack: React.FC = () => {
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
        name="ProfileHome"
        component={ProfileHomeScreen}
        options={{
          headerTitle: 'Profile',
        }}
      />
      <Stack.Screen name="MyAccount" component={MyAccountScreen} />
      <Stack.Screen
        name="PrivacyAndSecurity"
        component={PrivacyAndSecurityScreen}
      />
      <Stack.Screen name="Faq" component={FaqScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
