import React from 'react';
import {
  StyleSheet,
  TextInput as Input,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import Icon from '../Icon.tsx';
import { View } from '../index.ts';
import { useTheme } from '../../theme/ThemeContext.tsx';

interface Props extends TextInputProps {
  title?: string;
  onPress?: () => void;
  style?: object;
}
const PasswordInput: React.FC<Props> = ({ style, ...props }) => {
  const { colors } = useTheme();

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  return (
    <View
      style={[
        styles.inputContainer,
        {
          borderColor: colors.n200,
          flexDirection: 'row',
          alignItems: 'center',
        },
        style,
      ]}>
      <View style={{ marginLeft: 16 }}>
        <Icon name="lock" size={24} color={colors.n400} />
      </View>
      <Input
        style={[styles.input, { color: colors.n700 }]}
        {...props}
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity
        style={{ marginRight: 16 }}
        onPress={() => setShowPassword(!showPassword)}>
        <Icon
          name={'show'}
          size={24}
          color={showPassword ? colors.primary : colors.n400}
        />
      </TouchableOpacity>
    </View>
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

export default PasswordInput;
