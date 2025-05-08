import React from 'react';

import { StyleSheet, TouchableOpacity } from 'react-native';
import {useTheme} from '../../../theme/ThemeContext.tsx';
import {useNavigation} from '@react-navigation/native';
import {Icon, Text} from '../../../components';


export default function ListItem({ item, style }) {
    const { colors } = useTheme();
    const router = useNavigation();

    return (
        <TouchableOpacity
            style={[styles.container, style]}
            onPress={() => router.navigate(item.link)}
        >
            <Text base n700>
                {item.title}
            </Text>

            <Icon name="chevronRight" size={24} color={colors.n400} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
});
