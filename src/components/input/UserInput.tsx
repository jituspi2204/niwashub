import React from 'react';
import {StyleSheet, TextInput as Input, TextInputProps} from 'react-native';
import Icon from '../Icon.tsx';
import {View} from '../index.ts';
import {useTheme} from '../../theme/ThemeContext.tsx';
import Icons from "react-native-vector-icons/Feather";

interface Props extends TextInputProps {
    title?: string;
    onPress?: () => void;
    style?: object;
}
const UserInput: React.FC<Props> = ({ style, ...props}) => {
    const {colors} = useTheme();
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
            <View style={{marginLeft: 16}}>
                <Icons name="user" size={24} color={colors.n400} />
            </View>
            <Input
                style={[styles.input, {color: colors.n700}]}
                {...props}
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

export default UserInput;
