import React from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import LottieView from 'lottie-react-native';

export default function LoadingView() {
    const { colors } = useTheme();
    const animation = React.useRef(null);

    return (
        <SafeAreaView
            style={[
                styles.container,
                {
                    backgroundColor: colors.background,
                },
            ]}
        >
            <LottieView
                autoPlay
                ref={animation}
                style={[styles.lottie]}
                source={require('../../assets/loading.json')}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    lottieAnimation: {},

    lottie: {
        width: 140,
        height: 140,
    },
});
