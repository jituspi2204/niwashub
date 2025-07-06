import React from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Header, View } from '../../../components';
import { useTheme } from '../../../theme/ThemeContext.tsx';
import { useNavigation } from '@react-navigation/native';
import Section from '../components/Section.tsx';
import Services from '../components/Services.tsx';

const HomeScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  return (
    <View
      safe
      style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <Header
        type="main"
        onPress={() => navigation.navigate('Profile')}
        style={styles.header}
      />
      <Section title="Community">
        <Services items={[]} />
      </Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    borderBottomWidth: 0.2,
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
