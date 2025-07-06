import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header } from '../components';
import VisitorTopTab from './VisitorTopTab.tsx';
import AddVisitorScreen from '../features/visitors/screens/AddVisitorScreen.tsx';
import { useTheme } from '../theme/ThemeContext.tsx';

const getTitle = route => {
  switch (route) {
    case 'VisitorHome':
      return 'Visitors';
    case 'AddVisitor':
      return 'Add Visitor';
  }
};

const Stack = createNativeStackNavigator();
const VisitorStack: React.FC = () => {
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
      <Stack.Screen name="VisitorHome" component={VisitorTopTab} />
      <Stack.Screen name="AddVisitor" component={AddVisitorScreen} />
    </Stack.Navigator>
  );
};

export default VisitorStack;
