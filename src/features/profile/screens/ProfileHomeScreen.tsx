import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, TextInput, View } from '../../../components';
import { useTheme } from '../../../theme/ThemeContext.tsx';
import { avatars } from '../../../utils/images.ts';
import Toast from 'react-native-toast-message';
import ListItem from '../components/ListItem.tsx';
import mock from '../../../utils/mock.ts';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../auth/authSlice.ts';
import { getAuth, signOut } from '@react-native-firebase/auth';
import { RootState } from '../../../store/store.ts';
import { setLoading } from '../../../reducers/utilssSlice.ts';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
const ProfileHomeScreen: React.FC = ({ profileItems = mock.profileItems }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  // const loading = useSelector((state: RootState) => state.utils.loading);
  const logoutHandler = async () => {
    dispatch(setLoading({ active: true, message: 'Logging out...' }));
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    signOut(getAuth()).then(() => {
      dispatch(setLoading({ active: false, message: '' }));
    });
  };
  return (
    <View
      safe
      style={[
        styles.container,
        {
          backgroundColor: colors.n100,
        },
      ]}>
      <ScrollView>
        <View
          style={[
            styles.wrapper,
            {
              backgroundColor: colors.n50,
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
              Eleyas Hasan
            </Text>
            <Text caption n400>
              +1 352 844 0270
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.wrapper,
            {
              backgroundColor: colors.n50,
            },
          ]}>
          {profileItems.map((item, index) => (
            <ListItem
              key={index}
              item={item}
              style={{
                paddingTop: index === 0 ? 0 : 16,
                paddingBottom: index === profileItems.length - 1 ? 0 : 16,
                borderBottomWidth: index === profileItems.length - 1 ? 0 : 0.5,
                borderBottomColor: colors.n200,
              }}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.wrapper,
            {
              backgroundColor: colors.n50,
            },
          ]}
          onPress={logoutHandler}>
          <Text base n700 style={{ marginLeft: 16 }}>
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
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
