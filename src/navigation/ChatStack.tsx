import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileHomeScreen from '../features/profile/screens/ProfileHomeScreen.tsx';
import MyAccountScreen from '../features/profile/screens/MyAccountScreen.tsx';
import PrivacyAndSecurityScreen from '../features/profile/screens/PrivacyAndSecurityScreen.tsx';
import FaqScreen from '../features/profile/screens/FaqScreen.tsx';
import { Header } from '../components';
import { useTheme } from '../theme/ThemeContext.tsx';
import FlatsScreen from '../features/profile/screens/FlatsScreen.js.tsx';
import NotificationSettingScreen from '../features/profile/screens/NotificationSettingScreen.tsx';
import ChatHomeScreen from '../features/chat/screens/ChatHomeScreen.tsx';
import UserChatScreen from '../features/chat/screens/UserChatScreen.tsx';

const getTitle = route => {
  switch (route) {
    case 'ChatHome':
      return 'Chats';
    case 'MyAccount':
      return 'My Account';
    case 'Faq':
      return 'FAQs';
    case 'PrivacyAndSecurity':
      return 'Privacy and Security';
    case 'NotificationSetting':
      return 'Notification Settings';
    case 'MyFlats':
      return 'My Flats';
  }
};
const Stack = createNativeStackNavigator();

const ChatStack: React.FC = ({ navigation, route }) => {
  const { colors } = useTheme();
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
        name="ChatHome"
        component={ChatHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UserChat"
        component={UserChatScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="MyFlats" component={FlatsScreen} />
      <Stack.Screen
        name="NotificationSetting"
        component={NotificationSettingScreen}
      />
      <Stack.Screen
        name="PrivacyAndSecurity"
        component={PrivacyAndSecurityScreen}
      />
      <Stack.Screen name="Faq" component={FaqScreen} />
    </Stack.Navigator>
  );
};

export default ChatStack;
