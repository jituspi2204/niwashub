import React from 'react';

import { StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext.tsx';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from '../../../components';

interface SectionProps {
  content: string;
  timestamp: string;
  status: string | any;
  style?: ViewStyle;
  children: React.ReactNode;
}

const ReceivedMessage: React.FC<SectionProps> = ({
  content,
  timestamp,
  status,
  style,
  children,
}) => {
  const { colors } = useTheme();
  const router = useNavigation();

  return (
    <View style={styles.container}>
      <Text>{content}</Text>
    </View>
  );
};

export default ReceivedMessage;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
});
