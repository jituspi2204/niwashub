import React from 'react';
import { StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext.tsx';
import Icon from '../Icon.tsx';
import Text from '../common/Text.tsx';

interface Props extends TextInputProps {
  onPress?: () => void;
  style?: object;
  title?: string;
}
const ButtonInput: React.FC<Props> = ({ title, onPress }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.dateContainer, { borderColor: colors.n200 }]}
      onPress={onPress}>
      <Text base2 n700>
        {title}
      </Text>
      <Icon name="chevronDown" size={24} color={colors.n400} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 12,
    borderWidth: 1.5,
  },
  input: {
    fontSize: 16,
    fontFamily: 'Satoshi-Bold',
    minHeight: 56,
    borderRadius: 12,
    padding: 16,
    flex: 1,
  },
  dateContainer: {
    borderRadius: 12,
    borderWidth: 1.5,
    minHeight: 56,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});

export default ButtonInput;
