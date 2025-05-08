import React from 'react';
import {StyleSheet, TextInput as Input, TextInputProps, TouchableOpacity} from 'react-native';
import Icon from '../Icon.tsx';
import {View} from '../index.ts';
import {useTheme} from '../../theme/ThemeContext.tsx';
import CountrySelector from "../CountrySelector.tsx";
import Text from "../Text.tsx";

interface Props extends TextInputProps {
    title?: string;
    onPress?: () => void;
    style?: object;
}
const PhoneInput: React.FC<Props> = ({ style, ...props}) => {
    const {colors} = useTheme();
    const [activeCode, setActiveCode] = React.useState<any>({
        flat: '',
        code: '',
    });
    const [openModal, toggleOpenModal] = React.useState(false);
    const [value, setValue] = React.useState('');

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
            <CountrySelector
                callBack={(code, update) => {
                    if (update) {
                        setActiveCode(code);
                    }
                    toggleOpenModal(false);
                }}
                defaultValue="US"
                visibility={openModal}
            />
            <TouchableOpacity
                style={{ marginHorizontal: 8 }}
                onPressIn={() => toggleOpenModal(true)}>
                <Text h5 style={{ textAlign: 'center' }}>
                    {activeCode.flag}
                </Text>
            </TouchableOpacity>

            <View
                style={{
                    margin: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <Text h6 n500 style={{ textAlign: 'center' }}>
                    {activeCode.code}{' '}
                </Text>
            </View>
            <Input
                style={[styles.input, { color: colors.n700, letterSpacing: 3 }]}
                {...props}
                value={value}
                onChangeText={val => {
                    setValue(val);
                    // @ts-ignore
                    props.onChangeText(activeCode.code + value);
                }}
                keyboardType="numeric"
            />
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

export default PhoneInput;
