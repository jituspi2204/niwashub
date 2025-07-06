import React from 'react';

import { StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext.tsx';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from '../../../components';

interface SectionProps {
  title: string;
  style?: ViewStyle;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, style, children }) => {
  const { colors } = useTheme();
  const router = useNavigation();

  return (
    <View style={styles.container}>
      <Text h6 n700>
        {title}
      </Text>
      {children}
    </View>
  );
};

export default Section;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
});
