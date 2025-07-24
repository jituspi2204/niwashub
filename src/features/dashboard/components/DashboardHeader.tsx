import React, { useEffect, useState } from 'react';

import { Image, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext.tsx';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from '../../../components';
import Icon from '../../../components/Icon.tsx';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { images } from '../../../utils/images.ts';
import { FlatTypes } from '../../../types/index.ts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store.ts';

type HeaderProps = {
  title?: string;
  flats: FlatTypes.FlatDetailsType[];
  onPress?: () => void;
  style?: ViewStyle;
};

const DashboardHeader: React.FC<HeaderProps> = ({
  title,
  flats,
  style,
  onPress,
}) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const flatStore = useSelector((state: RootState) => state.flat);
  const activeFlat: FlatTypes.FlatDetailsType | null | {} =
    flatStore.activeFlatDetails;

  const flatListBlock = (
    <TouchableOpacity
      style={[
        styles.flatContainer,
        {
          backgroundColor: colors.subBackground,
        },
      ]}
      onPress={() => navigation.navigate('FlatList')}>
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
          {`${activeFlat.flatNo} / ${activeFlat.blockNo} `}
        </Text>
        <Text n600 base2Medium>
          {activeFlat.societyName}
        </Text>
      </View>
      <View style={[styles.downIcon, { borderColor: colors.n400 }]}>
        <FeatherIcon name="chevron-down" size={30} color={colors.n700} />
      </View>
    </TouchableOpacity>
  );

  const emptyFlatBlock = (
    <TouchableOpacity
      style={[
        styles.flatContainer,
        {
          backgroundColor: colors.subBackground,
        },
      ]}
      onPress={() => navigation.navigate('RegisterFlat')}>
      <FontAwesome name="plus-square-o" size={28} color={colors.primary} />
      <Text base2Medium n800 style={{ padding: 8 }}>
        Add Flat
      </Text>
    </TouchableOpacity>
  );
  return (
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
        {flats && flats.length > 0 ? flatListBlock : emptyFlatBlock}
      </View>

      <View style={[styles.iconContainer, {}]}>
        {flats && flats.length > 0 && (
          <FontAwesome
            name="plus-square-o"
            size={30}
            color={colors.n900}
            onPress={() => navigation.navigate('RegisterFlat')}
          />
        )}
        <Icon name="bell" size={30} color={colors.n900} />
      </View>
    </View>
  );
};

export default DashboardHeader;

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
    flexDirection: 'row',
    flex: 1,
    height: 44,
    borderRadius: 22,
    justifyContent: 'flex-end',
    alignItems: 'center',
    columnGap: 16,
  },
  downIcon: {
    marginLeft: 12,
    padding: 2,
    borderRadius: 100,
    borderWidth: 0.5,
  },
});
