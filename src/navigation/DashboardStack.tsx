import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../features/dashboard/screens/HomeScreen.tsx';
import {StyleSheet} from 'react-native';
import {Icon} from '../components';

const DashboardStack: React.FC = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarItemStyle: {backgroundColor: 'red'},
            }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: () => <Icon name="home" />,
                }}
            />
            <Tab.Screen
                name="Chat"
                component={HomeScreen}
                options={{
                    tabBarIcon: () => <Icon name="budgets" />,
                }}
            />
            <Tab.Screen
                name="Settings"
                component={HomeScreen}
                options={{
                    tabBarIcon: () => <Icon name="settings" />,
                }}
            />
            <Tab.Screen
                name="Account"
                component={HomeScreen}
                options={{
                    tabBarIcon: () => <Icon name="profile" />,
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: 'green',
    },
});

export default DashboardStack;
