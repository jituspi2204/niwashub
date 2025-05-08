import React, { ReactNode } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import {useTheme} from '../theme/ThemeContext.tsx';
import {View} from './index.ts';
// Define the props interface
interface BottomBarProps {
    children: ReactNode;
    style?: ViewStyle | ViewStyle[];
}

export default function BottomBar({ children, style }: BottomBarProps) {
    const { colors } = useTheme();

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.n100,
                },
                style,
            ]}
        >
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
});
