import React from 'react';
import { StyleSheet, TextInput as Input, TextInputProps } from 'react-native';
import Icon from '../../../components/Icon.tsx';
import Icons from 'react-native-vector-icons/Feather';
import { useTheme } from '../../../theme/ThemeContext.tsx';
import { View } from '../../../components/index.ts';
import AntDesign from 'react-native-vector-icons/Ionicons';
interface Props extends TextInputProps {
  title?: string;
  onPress?: () => void;
  style?: object;
}
const SendMessageInput: React.FC<Props> = ({ style, onPress, ...props }) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.inputContainer,
        {
          backgroundColor: colors.subBackground,
          flexDirection: 'row',
          alignItems: 'center',
        },
        style,
      ]}>
      <View style={{ marginLeft: 16 }}>
        <AntDesign name="attach" size={28} color={colors.n400} />
      </View>
      <Input style={[styles.input, { color: colors.n700 }]} {...props} />
      <AntDesign
        name="send"
        size={25}
        color={colors.primary}
        style={{ marginRight: 16 }}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 100,
    borderWidth: 0,
    marginBottom: 6,
    height: 55,
  },
  input: {
    fontSize: 16,
    fontFamily: 'Satoshi-Bold',
    minHeight: 56,
    borderRadius: 12,
    padding: 16,
    flex: 1,
  },
  dateContainer: {},
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});

export default SendMessageInput;
