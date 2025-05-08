import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../features/dashboard/screens/HomeScreen.tsx';
import { StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '../components';
import { useTheme } from '../theme/ThemeContext.tsx';
import HomeStack from './HomeStack.tsx';

const DashboardBottomTab: React.FC = () => {
  const Tab = createBottomTabNavigator();
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
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'homeBold' : 'home'} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'graphBold' : 'graph'} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'budgetsBold' : 'budgets'} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'settingsBold' : 'settings'} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 80,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderTopWidth: 0,
    elevation: 3,
  },
  tabBarItem: {
    alignSelf: 'center',
    height: 50,
  },
});

export default DashboardBottomTab;
