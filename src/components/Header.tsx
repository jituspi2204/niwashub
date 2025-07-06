import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useTheme } from '../theme/ThemeContext';
import Icon from './Icon';
import Text from './common/Text.tsx';
import View from './common/View.tsx';
import { images } from '../utils';

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
                styles.flatContainer,
                {
                  backgroundColor: colors.subBackground,
                },
              ]}
              onPress={() => navigation.navigate('Profile')}>
              <Image
                source={images.house3d}
                width={30}
                height={30}
                resizeMode="contain"
                resizeMethod="auto"
                style={{ width: 50, height: 50 }}
              />
              <View>
                <Text n800 base>
                  F6/B
                </Text>
                <Text n600 base2Medium>
                  Aditya Apartments
                </Text>
              </View>
              <View style={[styles.downIcon, { borderColor: colors.n400 }]}>
                <FeatherIcon
                  name="chevron-down"
                  size={30}
                  color={colors.n700}
                />
              </View>
            </TouchableOpacity>
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
              paddingHorizontal: 16,
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
    paddingVertical: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  flatContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 22,
    overflow: 'hidden',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
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
  downIcon: {
    marginLeft: 12,
    padding: 2,
    borderRadius: 100,
    borderWidth: 0.5,
  },
});
