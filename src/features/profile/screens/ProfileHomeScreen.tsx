import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { userApi } from '../../../api/index.ts';
import { Text, View } from '../../../components';
import WrappedView from '../../../components/WrappedView.tsx';
import { RootState } from '../../../store/store.ts';
import { useTheme } from '../../../theme/ThemeContext.tsx';
import { avatars } from '../../../utils/images.ts';
import mock from '../../../utils/mock.ts';
import { logoutUser } from '../../auth/authSlice.ts';
import ListItem from '../components/ListItem.tsx';

const ProfileHomeScreen: React.FC = ({ profileItems = mock.profileItems }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const auth = useSelector((state: RootState) => state.auth);
  const logoutHandler = async () => {
    setLoading(true);
    const response = await userApi.logoutUser(auth.loginToken);
    if (response) {
      dispatch(logoutUser());
      await AsyncStorage.multiRemove([
        'login_token',
        'new_user',
        'active_flat',
        'role',
      ]);
    }
    setLoading(false);
  };
  return (
    <WrappedView isLoading={loading}>
      <View
        safe
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <ScrollView>
          <View
            style={[
              styles.wrapper,
              {
                backgroundColor: colors.subBackground,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 16,
              },
            ]}>
            <View>
              <View
                style={[
                  styles.avatar_container,
                  {
                    borderColor: colors.blue50,
                  },
                ]}>
                <Image source={avatars.indianMan} style={styles.avatar} />
              </View>
            </View>
            <View
              style={[
                {
                  gap: 8,
                },
              ]}>
              <Text base n700>
                {auth.user.name}
              </Text>
              <Text caption n400>
                {auth.user.phone_number}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.wrapper,
              {
                backgroundColor: colors.subBackground,
              },
            ]}>
            {profileItems.map((item, index) => (
              <ListItem
                key={index}
                item={item}
                style={{
                  paddingTop: index === 0 ? 0 : 16,
                  paddingBottom: index === profileItems.length - 1 ? 0 : 16,
                  borderBottomWidth:
                    index === profileItems.length - 1 ? 0 : 0.5,
                  borderBottomColor: colors.n200,
                }}
              />
            ))}
          </View>

          <TouchableOpacity
            style={[
              styles.wrapper,
              {
                backgroundColor: colors.subBackground,
              },
            ]}
            onPress={logoutHandler}>
            <Text base n700 style={{ marginLeft: 16 }}>
              Logout
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </WrappedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    marginTop: 24,
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
  },

  avatar_container: {
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
    objectFit: 'cover',
  },
});

export default ProfileHomeScreen;
