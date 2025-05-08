import React from 'react';
import {
    View as DefaultView,
    SafeAreaView,
    StyleSheet,
    ViewStyle,
    StyleProp,
    ViewProps,
} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {LoadingView} from './index.ts';

type CustomViewProps = ViewProps & {
    children?: React.ReactNode;
    isLoading?: boolean;
    loadingText?: string;
};

export default function WrappedView({
    children,
    isLoading = false,
    loadingText,
}: CustomViewProps) {
    const {colors} = useTheme();

    return (
        <>
            {isLoading && (
                <SafeAreaView style={styles.container}>
                    <LoadingView loadingText={loadingText} />
                </SafeAreaView>
            )}
            {children}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        zIndex: 100,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'transparent',
    },
});
