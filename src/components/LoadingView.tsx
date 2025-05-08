import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import LottieView from 'lottie-react-native';
import {Text} from './index.ts';

interface Props {
    loadingText?: string;
}

const LoadingView: React.FC<Props> = ({loadingText}) => {
    const {colors} = useTheme();
    const animation = React.useRef(null);

    return (
        <SafeAreaView
            style={[
                styles.container,
                {
                    backgroundColor: colors.background,
                },
            ]}>
            <LottieView
                autoPlay
                ref={animation}
                style={[styles.lottie]}
                source={require('../../assets/loading.json')}
            />
            <Text h6 style={{color: '#1FAD98'}}>
                finchmoney.ai
            </Text>
            <Text base n400>
                {loadingText}
            </Text>
        </SafeAreaView>
    );
};

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

export default LoadingView;
