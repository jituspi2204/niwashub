import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../features/dashboard/screens/HomeScreen.tsx';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, View } from '../components';
import { useTheme } from '../theme/ThemeContext.tsx';
import HomeStack from './HomeStack.tsx';
import SettingsStack from './SettingsStack.tsx';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import ProfileStack from './ProfileStack.tsx';
import ListItem from '../features/profile/components/ListItem.tsx';

const Tab = createBottomTabNavigator();
const GuardBottomTab: React.FC = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarBackground: () => null,
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: [styles.tabBar, { backgroundColor: colors.n50 }],
        tabBarItemStyle: styles.tabBarItem,
        tabBarButton: props => (
          <TouchableOpacity style={{ width: 60, height: 60 }} {...props} />
        ),
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeScreen';
          return {
            tabBarIcon: ({ color, focused }) => {
              return (
                <Icon name={focused ? 'homeBold' : 'home'} color={color} />
              );
            },
            tabBarStyle:
              routeName === 'HomeScreen'
                ? [styles.tabBar, { backgroundColor: colors.background }]
                : [{ display: 'none' }],
          };
        }}
      />
      <Tab.Screen
        name="Chat"
        component={HomeScreen}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'BudgetHome';
          return {
            tabBarIcon: ({ color, focused }) => {
              return (
                <IonIcon
                  name={
                    focused
                      ? 'chatbubble-ellipses'
                      : 'chatbubble-ellipses-outline'
                  }
                  color={color}
                  size={28}
                />
              );
            },
            tabBarStyle:
              routeName === 'BudgetHome'
                ? [styles.tabBar, { backgroundColor: colors.background }]
                : [{ display: 'none' }],
          };
        }}
      />
      <Tab.Screen
        name="Account"
        component={ProfileStack}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'BudgetHome';
          return {
            tabBarIcon: ({ color, focused }) => {
              return (
                <FontAwesomeIcon
                  name={focused ? 'user' : 'user-o'}
                  color={color}
                  size={26}
                />
              );
            },
            tabBarStyle: [
              styles.tabBar,
              { backgroundColor: colors.background },
            ],
          };
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={({ route }) => {
          const routeName =
            getFocusedRouteNameFromRoute(route) ?? 'SettingsHome';
          return {
            tabBarIcon: ({ color, focused }) => {
              return (
                <Icon
                  name={focused ? 'settingsBold' : 'settings'}
                  color={color}
                />
              );
            },
            tabBarStyle:
              routeName === 'SettingsHome'
                ? [styles.tabBar, { backgroundColor: colors.background }]
                : [{ display: 'none' }],
          };
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    display: 'flex',
    height: 70,
    elevation: 0,
    borderTopWidth: 0,
  },
  tabBarItem: {
    alignSelf: 'center',
    height: 50,
  },
});

export default GuardBottomTab;
