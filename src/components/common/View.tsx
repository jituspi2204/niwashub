import React from 'react';
import {
    View as DefaultView,
    SafeAreaView,
    StyleSheet,
    ViewStyle,
    StyleProp,
    ViewProps,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext.tsx';

type CustomViewProps = ViewProps & {
    children?: React.ReactNode;
    safe?: boolean;
    flex?: number;
    color?: string;
    style?: StyleProp<ViewStyle>;
};

export default function View({
                                 children,
                                 safe = false,
                                 flex,
                                 color,
                                 style,
                                 ...props
                             }: CustomViewProps) {
    const { colors } = useTheme();

    const styles = StyleSheet.flatten([
        flex !== undefined && { flex },
        color !== undefined ? { backgroundColor: color } : undefined,
        style,
    ]);

    if (safe) {
        return (
            <SafeAreaView style={styles} {...props}>
                {children}
            </SafeAreaView>
        );
    }

    return (
        <DefaultView style={styles} {...props}>
            {children}
        </DefaultView>
    );
}
