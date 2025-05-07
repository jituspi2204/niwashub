import React from 'react';
import {
    Platform,
    StyleSheet,
    TouchableOpacity,
    GestureResponderEvent,
    StyleProp,
    ViewStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type ButtonProps = {
    type: 'primary' | 'secondary' | 'dashed' | 'svg';
    buttonStyles?: StyleProp<ViewStyle>;
    disabled?: boolean;
    activeOpacity?: number;
    onPress?: (event: GestureResponderEvent) => void;
    style?: StyleProp<ViewStyle>;
    children: React.ReactNode;
};

export default function Button({
                                   type,
                                   buttonStyles,
                                   disabled = false,
                                   activeOpacity = 0.8,
                                   onPress,
                                   style,
                                   children,
                                   ...props
                               }: ButtonProps) {
    const { colors } = useTheme();

    let buttonContent;

    switch (type) {
        case 'primary':
            buttonContent = (
                <TouchableOpacity
                    style={[
                        styles.container,
                        { backgroundColor: colors.blue500 },
                        style,
                    ]}
                    disabled={disabled}
                    activeOpacity={activeOpacity}
                    onPress={onPress}
                    {...props}
                >
                    {children}
                </TouchableOpacity>
            );
            break;

        case 'secondary':
            buttonContent = (
                <TouchableOpacity
                    style={[
                        styles.container,
                        {
                            backgroundColor: colors.n50,
                            borderColor: colors.n200,
                            borderWidth: 1,
                        },
                        style,
                    ]}
                    disabled={disabled}
                    activeOpacity={activeOpacity}
                    onPress={onPress}
                    {...props}
                >
                    {children}
                </TouchableOpacity>
            );
            break;

        case 'dashed':
            buttonContent = (
                <TouchableOpacity
                    style={[
                        styles.container,
                        {
                            borderColor: colors.n200,
                            borderWidth: 1.5,
                            borderStyle: 'dashed',
                        },
                        style,
                    ]}
                    disabled={disabled}
                    activeOpacity={activeOpacity}
                    onPress={onPress}
                    {...props}
                >
                    {children}
                </TouchableOpacity>
            );
            break;

        case 'svg':
            buttonContent = (
                <TouchableOpacity
                    onPress={onPress}
                    style={[
                        styles.svg,
                        {
                            backgroundColor: colors.n7,
                        },
                        style,
                    ]}
                    activeOpacity={activeOpacity}
                    disabled={disabled}
                    {...props}
                >
                    {children}
                </TouchableOpacity>
            );
            break;

        default:
            buttonContent = null;
    }

    return buttonContent;
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        paddingHorizontal: 24,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 56,
    },
    svg: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
