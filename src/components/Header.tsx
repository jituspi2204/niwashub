import React from 'react';
import {Image, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import Text from './Text';
import View from './View';
import Icon from './Icon';
import {useTheme} from '../theme/ThemeContext';

type HeaderProps = {
    type: 'main' | 'secondary' | 'single';
    title?: string;
    onPress?: () => void;
    style?: ViewStyle;
};

export default function Header({type, title, onPress, style}: HeaderProps) {
    const {colors} = useTheme();
    const router = {};

    let content;

    switch (type) {
        case 'main':
            content = (
                <View
                    style={[
                        styles.container,
                        {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        },
                        style,
                    ]}>
                    <View style={styles.titleContainer}>
                        <TouchableOpacity
                            style={[
                                styles.avatarContainer,
                                {
                                    borderColor: colors.blue50,
                                },
                            ]}
                            // onPress={() => router.push('/login')}
                        >
                            <Image
                                source={require('../../assets/avatars/19. Professor.png')}
                                style={styles.avatar}
                            />
                        </TouchableOpacity>

                        <View>
                            <Text blue200 caption>
                                Hello, Eleyas
                            </Text>
                            <Text blue50 base>
                                Welcome back!
                            </Text>
                        </View>
                    </View>

                    <View
                        style={[
                            styles.iconContainer,
                            {
                                backgroundColor: colors.blue400,
                            },
                        ]}>
                        <Icon name="bell" size={24} color={colors.blue50} />
                    </View>
                </View>
            );
            break;

        case 'secondary':
            content = (
                <View
                    style={[
                        styles.container,
                        {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        },
                    ]}>
                    <TouchableOpacity onPress={onPress}>
                        <Icon name="arrowLeft" size={24} color={colors.n700} />
                    </TouchableOpacity>
                    <Text h6>{title}</Text>
                </View>
            );
            break;

        case 'single':
            content = (
                <View
                    style={[
                        styles.container,
                        {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        },
                    ]}>
                    <Text h6>{title}</Text>
                </View>
            );
            break;

        default:
            content = null;
    }

    return content;
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 64,
        paddingBottom: 16,
        paddingHorizontal: 16,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatarContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FBE7CB',
        borderWidth: 1.5,
    },
    avatar: {
        width: 44,
        height: 44,
        resizeMode: 'cover',
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
