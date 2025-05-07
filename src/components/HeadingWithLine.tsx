import React from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {View, Text} from './index';

interface HeadingWithLineProps {
    title?: string;
    style?: object;
}
const HeadingWithLine: React.FC<HeadingWithLineProps> = ({title, style}) => {
    const {colors} = useTheme();
    return (
        <View style={[styles.container, style]}>
            <View style={[styles.line, {backgroundColor: colors.n400}]} />
            <Text caption n400 style={{marginHorizontal: 10}}>
                {title}
            </Text>
            <View style={[styles.line, {backgroundColor: colors.n400}]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    line: {
        flex: 1,
        height: 1,
    },
});

export default HeadingWithLine;
