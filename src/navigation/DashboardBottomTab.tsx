import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../features/dashboard/screens/HomeScreen.tsx';
import { StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '../components';
import { useTheme } from '../theme/ThemeContext.tsx';
import HomeStack from './HomeStack.tsx';
import SettingsStack from './SettingsStack.tsx';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const DashboardBottomTab: React.FC = () => {
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
                ? [styles.tabBar, { backgroundColor: colors.n50 }]
                : [{ display: 'none' }],
          };
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={HomeScreen}
        options={({ route }) => {
          const routeName =
            getFocusedRouteNameFromRoute(route) ?? 'StatisticsHome';
          return {
            tabBarIcon: ({ color, focused }) => {
              return (
                <Icon name={focused ? 'graphBold' : 'graph'} color={color} />
              );
            },
            tabBarStyle:
              routeName === 'StatisticsHome'
                ? [styles.tabBar, { backgroundColor: colors.n50 }]
                : [{ display: 'none' }],
          };
        }}
      />
      <Tab.Screen
        name="Budgets"
        component={HomeScreen}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'BudgetHome';
          return {
            tabBarIcon: ({ color, focused }) => {
              return (
                <Icon name={focused ? 'graphBold' : 'graph'} color={color} />
              );
            },
            tabBarStyle:
              routeName === 'BudgetHome'
                ? [styles.tabBar, { backgroundColor: colors.n50 }]
                : [{ display: 'none' }],
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
                ? [styles.tabBar, { backgroundColor: colors.n50 }]
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

export default DashboardBottomTab;
