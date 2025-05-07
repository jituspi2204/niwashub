import React from 'react';
import {
    TextInput as Input,
    StyleSheet,
    TouchableOpacity,
    TextInputProps,
} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import View from './View';
import Text from './Text';
import Icon from './Icon';
import Icons from 'react-native-vector-icons/Feather';
import {countryFLagAndPhoneCode} from '../utils/countryPhoneCode';

interface CoutryCode {
    flag: string;
    code: string;
    country: string;
}

// Define the possible types for the TextInput
type TextInputType =
    | 'user'
    | 'single'
    | 'button'
    | 'placeholder'
    | 'email'
    | 'password'
    | 'number'
    | 'phone'
    | 'phone-other';
interface TextInputPropsExtended extends TextInputProps {
    type: TextInputType;
    title?: string;
    onPress?: () => void;
    style?: object;
}

export default function TextInput({
    type,
    title,
    onPress,
    style,
    ...props
}: TextInputPropsExtended) {
    const {colors} = useTheme();
    const flagCodeMap: Record<string, CoutryCode> = {};
    if (type === 'phone') {
        countryFLagAndPhoneCode.forEach(data => {
            // @ts-ignore
            flagCodeMap[data.code] = {
                country: data.code,
                flag: data.flag,
                code: data.dial_code,
            };
        });
    }

    const [activeCode, setActiveCode] = React.useState<CoutryCode>(
        flagCodeMap.IN,
    );

    let content;

    switch (type) {
        case 'single':
            content = (
                <View
                    style={[
                        styles.inputContainer,
                        {borderColor: colors.n200},
                        style,
                    ]}>
                    <Input
                        style={[styles.input, {color: colors.n700}]}
                        {...props}
                    />
                </View>
            );
            break;

        case 'button':
            content = (
                <TouchableOpacity
                    style={[styles.dateContainer, {borderColor: colors.n200}]}
                    onPress={onPress}>
                    <Text base2 n700>
                        {title}
                    </Text>
                    <Icon name="chevronDown" size={24} color={colors.n400} />
                </TouchableOpacity>
            );
            break;

        case 'placeholder':
            content = (
                <View
                    style={[styles.dateContainer, {borderColor: colors.n200}]}>
                    <Text base2 n400>
                        Deadline
                    </Text>
                    <Text base2 n700>
                        {title}
                    </Text>
                </View>
            );
            break;

        case 'email':
            content = (
                <View
                    style={[
                        styles.inputContainer,
                        {
                            alignItems: 'center',
                            borderColor: colors.n200,
                            flexDirection: 'row',
                        },
                        style,
                    ]}>
                    <View style={{marginLeft: 16}}>
                        <Icon name="message" size={24} color={colors.n400} />
                    </View>
                    <Input
                        style={[styles.input, {color: colors.n700}]}
                        {...props}
                    />
                </View>
            );
            break;
        case 'user':
            content = (
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
            break;
        case 'password':
            content = (
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
                        <Icon name="lock" size={24} color={colors.n400} />
                    </View>
                    <Input
                        style={[styles.input, {color: colors.n700}]}
                        {...props}
                    />
                    <View style={{marginRight: 16}}>
                        <Icon name="show" size={24} color={colors.n400} />
                    </View>
                </View>
            );
            break;

        case 'number':
            content = (
                <View
                    style={[
                        styles.inputContainer,
                        {
                            borderWidth: 0,
                            backgroundColor: colors.n100,
                            flexDirection: 'row',
                            alignItems: 'center',
                            flex: 1,
                        },
                        style,
                    ]}>
                    <Input
                        style={[
                            styles.input,
                            {
                                color: colors.n700,
                                textAlign: 'center',
                            },
                        ]}
                        {...props}
                    />
                </View>
            );
            break;

        case 'phone':
            content = (
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
                    <TouchableOpacity style={{marginHorizontal: 8}}>
                        <Text h5 style={{textAlign: 'center'}}>
                            {activeCode.flag}
                        </Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            margin: 8,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <Text h6 n500 style={{textAlign: 'center'}}>
                            {activeCode.code}{' '}
                        </Text>
                    </View>
                    <Input
                        maxLength={10}
                        style={[
                            styles.input,
                            {color: colors.n700, letterSpacing: 3},
                        ]}
                        {...props}
                        keyboardType="numeric"
                    />
                </View>
            );
            break;

        case 'phone-other':
            content = (
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
                        <Icons name="phone" size={24} color={colors.n400} />
                    </View>
                    <Input
                        style={[styles.input, {color: colors.n600}]}
                        {...props}
                    />
                </View>
            );
            break;
    }

    return content;
}

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
