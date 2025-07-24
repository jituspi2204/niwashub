import React from 'react';

import { Image, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext.tsx';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from '../../../components/index.ts';
import Ionicon from 'react-native-vector-icons/Ionicons';

interface SectionProps {
  userList: any[];
  style?: ViewStyle;
  children: React.ReactNode;
}

const UserList: React.FC<SectionProps> = ({
  userList = [],
  style,
  children,
}) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const getStatusBox = (status: 'RECEIVED' | 'DELIVERED' | 'SEEN') => {
    switch (status) {
      case 'RECEIVED':
        return <Ionicon name="checkmark-done" size={18} color={colors.n600} />;
      case 'DELIVERED':
        return <Ionicon name="checkmark" size={18} color={colors.n600} />;
      default:
        return (
          <Ionicon name="checkmark-done" size={18} color={colors.primary} />
        );
    }
  };

  const userChatHandler = (userName, userId) => {
    navigation.navigate('UserChat', {
      userName,
      userId,
    });
  };

  return (
    <View style={styles.container}>
      {userList.map((value: any, index) => (
        <TouchableOpacity
          key={`${value.id}`}
          id={value.id}
          style={[styles.userCard, {}]}
          onPress={() => userChatHandler(value.name, value.id)}>
          <View style={{ width: 80 }}>
            <Image
              source={{ uri: value.image }}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text body2 n800>
              {value.name}
            </Text>
            <Text base2Medium n600>
              {value.lastMessage}
            </Text>
          </View>
          <View style={{ width: 25 }}>{getStatusBox(value.status)}</View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default UserList;

const styles = StyleSheet.create({
  container: {},
  icon: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  userCard: {
    marginVertical: 2,
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
