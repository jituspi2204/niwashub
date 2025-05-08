import React from 'react';
import { Image, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Text from './Text';
import View from './View';
import Icon from './Icon';
import { useTheme } from '../theme/ThemeContext';
import { avatars } from '../utils/images.ts';
import { useNavigation } from '@react-navigation/native';

type HeaderProps = {
  type: 'main' | 'secondary' | 'single';
  title?: string;
  onPress?: () => void;
  style?: ViewStyle;
};

export default function Header({ type, title, onPress, style }: HeaderProps) {
  const { colors } = useTheme();
  const navigation = useNavigation();
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
              onPress={() => navigation.navigate('Profile')}>
              <Image source={avatars.indianMan} style={styles.avatar} />
            </TouchableOpacity>

            <View>
              <Text n400 base>
                Hello, Eleyas
              </Text>
              <Text n700 h6>
                Welcome back!
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: colors.primary,
              },
            ]}>
            <Icon name="bell" size={24} color={colors.n700} />
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
            style,
          ]}>
          <TouchableOpacity onPressIn={onPress}>
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
    paddingTop: 16,
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
