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
import ContactUsScreen from '../features/settings/screens/ContactUsScreen.tsx';
import LanguageSettingScreen from '../features/settings/screens/LanguageSettingScreen.tsx';
import SecurityScreen from '../features/settings/screens/SecurityScreen.tsx';
import SettingsHomeScreen from '../features/settings/screens/SettingsHomeScreen.tsx';

const getTitle = route => {
  switch (route) {
    case 'SettingsHome':
      return 'Settings';
    case 'LanguageSetting':
      return 'Language settings';
    case 'ContactUs':
      return 'Contact Us';
    case 'SecuritySetting':
      return 'Security';
  }
};

const Stack = createNativeStackNavigator();
const SettingsStack: React.FC = () => {
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
        name="SettingsHome"
        component={SettingsHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="LanguageSetting" component={LanguageSettingScreen} />
      <Stack.Screen name="SecuritySetting" component={SecurityScreen} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
