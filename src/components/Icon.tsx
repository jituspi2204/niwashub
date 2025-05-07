import React from 'react';
import {
    Animated,
    Image,
    ImageStyle,
    ImageProps,
    StyleSheet,
    StyleProp,
    ImageResizeMode,
} from 'react-native';
import icons from '../utils/icons';

// Type for the icon name based on the keys of the icons object
type IconName = keyof typeof icons;

interface IconProps extends Partial<ImageProps> {
    name: IconName;
    size?: number;
    width?: number;
    height?: number;
    color?: string;
    animated?: boolean;
    resizeMode?: ImageResizeMode;
    style?: StyleProp<StyleProp<any>>;
}

export default function Icon({
                                 name,
                                 size,
                                 width,
                                 height,
                                 color,
                                 animated = false,
                                 resizeMode = 'contain',
                                 style,
                                 ...props
                             }: IconProps) {
    const iconStyles = StyleSheet.flatten([
        styles.icon,
        size && { width: size, height: size },
        width && { width },
        height && { height },
        color && color !== 'none' && { tintColor: color },
        style,
    ]);

    const source = icons[name];

    if (animated) {
        return (
            <Animated.Image
                source={source}
                resizeMode={resizeMode}
                style={iconStyles}
                {...props}
            />
        );
    }

    return (
        <Image
            source={source}
            resizeMode={resizeMode}
            style={iconStyles}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    icon: {
        height: 28,
        width: 28,
    },
});
