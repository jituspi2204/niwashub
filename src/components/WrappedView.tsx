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
import OverlayLoader from './loaders/OverlayLoader.tsx';



type CustomViewProps = ViewProps & {
    children?: React.ReactNode;
    isLoading?: boolean;
    loadingText?: string;
    loadingStyle?: 'overlay' | null | undefined | boolean;
};

export default function WrappedView({
    children,
    isLoading = false,
    loadingText,
  loadingStyle = null,
}: CustomViewProps) {
    const {colors} = useTheme();

    return (
        <>
          {isLoading ? (
            loadingStyle === 'overlay' ? (
              <OverlayLoader loading={true} children={children} />
            ) : (
              <SafeAreaView style={styles.container}>
                <LoadingView loadingText={loadingText} />
              </SafeAreaView>
            )
          ) : (
            children
          )}
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
