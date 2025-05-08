import React from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {
  Button,
  Header,
  Icon,
  Text,
  TextInput,
  View,
} from '../../../components';
import { useTheme } from '../../../theme/ThemeContext.tsx';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  return (
    <View
      safe
      style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={colorScheme == 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <Header type="main" onPress={() => navigation.navigate('Profile')} />
      <TextInput
        title="Add bill"
        type="button"
        onPress={() => navigation.navigate('AddBill', {})}
      />

      <TextInput
        title="Add income"
        type="button"
        onPress={() => navigation.navigate('AddIncome', {})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  balance: {
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },

  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  button: {
    marginTop: 24,
    width: Dimensions.get('window').width - 32,
  },

  content: {
    paddingBottom: 64,
  },

  card: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },

  title: {
    marginHorizontal: 16,
  },

  addBill: {
    borderWidth: 0.5,
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  transactions: {
    marginTop: 16,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    gap: 16,
  },

  buttonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
  },

  toast: {
    position: 'absolute',
    zIndex: 99,
    bottom: 24,
  },
});

export default HomeScreen;
