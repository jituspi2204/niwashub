import React from 'react';

import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext.tsx';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from '../../../components';
import { avatars } from '../../../utils/images.ts';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface VisitorInfo {
  guestName: string;
  phoneNumber: string;
  purpose: string;
  date: Date;
}

interface VisitorCardProps {
  visitor: VisitorInfo;
}

const VisitorCard: React.FC<VisitorCardProps> = ({ visitor }) => {
  const { colors } = useTheme();
  const router = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: colors.subBackground }]}>
      <View style={styles.topBox}>
        <Image
          source={avatars.indianMan}
          width={45}
          height={45}
          style={styles.img}
        />
        <View style={{ flex: 1 }}>
          <Text base style={{ marginVertical: 4 }}>
            {visitor.guestName}
          </Text>
          <Text base2 style={{ marginVertical: 4 }}>
            {visitor.phoneNumber}
          </Text>
          <View
            style={{
              marginVertical: 4,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text base2 n600>
              {visitor.purpose}
            </Text>
            <Text base2Medium n600>
              {visitor.date}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={[styles.lineBox, { borderColor: colors.n300 }]}>
        <AntDesign name="qrcode" size={40} color={colors.primary} />
        <Text base2 primary style={{ marginHorizontal: 8 }}>
          Share QR Access Code
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default VisitorCard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'column',
    width: '99%',
    elevation: 2,
    marginVertical: 16,
    borderRadius: 8,
    marginHorizontal: 1,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 20,
  },
  lineBox: {
    borderTopWidth: 1,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBox: {
    paddingVertical: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
