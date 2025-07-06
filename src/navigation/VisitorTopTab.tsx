import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CancelledVisitorScreen from '../features/visitors/screens/CancelledVisitorScreen.tsx';
import CompletedVisitorScreen from '../features/visitors/screens/CompletedVisitorScreen.tsx';
import UpcomingVisitorScreen from '../features/visitors/screens/UpcomingVisitorScreen.tsx';
import { useTheme } from '../theme/ThemeContext.tsx';
import { StyleSheet } from 'react-native';
import { userApi } from '../api';
import { utilTypes } from '../types';
import WrappedView from '../components/WrappedView.tsx';

const getTitle = route => {
  switch (route) {
    case 'UpcomingVisitor':
      return 'Upcoming';
    case 'CompletedVisitor':
      return 'Completed';
    case 'CancelledVisitor':
      return 'Cancelled';
    case 'SecuritySetting':
      return 'Security';
  }
};

const Tab = createMaterialTopTabNavigator();
const VisitorTopTab: React.FC = () => {
  const { colors, fonts } = useTheme();
  const [visitors, setVisitors] = useState<any>([]);
  const [loading, setLoading] = useState<utilTypes.LoadingState>({
    loading: true,
  });

  useEffect(() => {
    userApi.userVisitors().then(data => {
      setTimeout(() => {
        setVisitors(data?.data || []);
        setLoading({ loading: false });
      }, 1500);
    });
  }, []);

  return (
    <WrappedView isLoading={loading.loading} loadingStyle={'overlay'}>
      <Tab.Navigator
        screenOptions={({ route, navigation }) => ({
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.n700,
          tabBarStyle: [styles.tabBar, { backgroundColor: colors.background }],
          title: getTitle(route.name),
          tabBarLabelStyle: { ...fonts.base, color: colors.n800 },
          tabBarIndicatorStyle: { backgroundColor: colors.primary },
        })}>
        <Tab.Screen
          name="UpcomingVisitor"
          component={UpcomingVisitorScreen}
          initialParams={{ visitors }}
        />
        <Tab.Screen
          name="CompletedVisitor"
          component={CompletedVisitorScreen}
          initialParams={{ visitors }}
        />
        <Tab.Screen
          name="CancelledVisitor"
          component={CancelledVisitorScreen}
          initialParams={{ visitors }}
        />
      </Tab.Navigator>
    </WrappedView>
  );
};

export default VisitorTopTab;

const styles = StyleSheet.create({
  tabBar: {},
});
