import React from 'react';

import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext.tsx';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from '../../../components';
import Icon from '../../../components/Icon.tsx';
import Feather from 'react-native-vector-icons/Feather';

type HeaderProps = {
  title?: string;
  onPress?: () => void;
  style?: ViewStyle;
};

const UserChatHeader: React.FC<HeaderProps> = ({ title, style, onPress }) => {
  const { colors } = useTheme();
  const router = useNavigation();

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomColor: colors.subBackground,
        },
        style,
      ]}>
      <TouchableOpacity onPressIn={onPress}>
        <Icon name="arrowLeft" size={28} color={colors.n700} />
      </TouchableOpacity>
      <Text h6 style={{ flex: 1, marginHorizontal: 16 }}>
        {title}
      </Text>
      <Feather name="phone" size={24} color={colors.n700} />
    </View>
  );
};

export default UserChatHeader;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 2,
    borderBottomWidth: 1,
  },
});
