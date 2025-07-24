import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { authApi } from '../../../api/index.ts';
import { Button, Text, View } from '../../../components';
import { PhoneInput, TextInput } from '../../../components/input';
import WrappedView from '../../../components/WrappedView.tsx';
import { AuthStackParamList } from '../../../navigation/types.ts';
import { useTheme } from '../../../theme/ThemeContext.tsx';
import { logInUser } from '../authSlice.ts';

const LoginScreen: React.FC = ({}) => {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [phoneNumber, setPhoneNumber] = React.useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const loginHandler = async () => {
    if (phoneNumber.length < 8 || password.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid phone number',
      });
      return;
    }
    setLoading(true);
    const response = await authApi.loginUserThroughPhonePassword(
      phoneNumber,
      password,
    );
    if (response.data) {
      let user = response.data.user;
      let loginToken = response.data.login_token;
      await AsyncStorage.multiSet([
        ['login_token', loginToken],
        ['new_user', 'true'],
        ['role', ''],
      ]);
      dispatch(
        logInUser({
          loggedIn: true,
          loginToken: loginToken,
          id: user.id,
          user: user,
          newUser: true,
        }),
      );
      navigation.navigate('UserRole');
    } else {
      console.log('error in screen', response);

      Toast.show({
        type: 'error',
        text1: response.error,
      });
    }
    setLoading(false);
  };

  return (
    <WrappedView isLoading={loading} loadingText={''} loadingStyle="overlay">
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
          },
        ]}>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <ScrollView contentContainerStyle={{ width: '100%' }}>
          <View style={[styles.titleContainer]}>
            <Text h5 n800>
              Welcome back!
            </Text>
            <Text base2 n600>
              Login to your account to manage your society in smarter way
            </Text>
          </View>
          <View
            style={[
              styles.wrapper,
              {
                backgroundColor: colors.subBackground,
              },
            ]}>
            <PhoneInput
              placeholder="Phone number"
              onChangeText={val => setPhoneNumber(val)}
            />
            <TextInput
              type="password"
              placeholder="Enter password"
              onChangeText={val => setPassword(val)}
            />
            <TouchableOpacity
              style={{ alignSelf: 'flex-end' }}
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text base2Medium primary>
                Forgot password
              </Text>
            </TouchableOpacity>
            <Button
              type="primary"
              style={{ marginVertical: 20 }}
              onPress={loginHandler}>
              <Text base blue50>
                Login
              </Text>
            </Button>
            <View style={[styles.flexRow, { justifyContent: 'center' }]}>
              <Text base2>Dont have an account?</Text>
              <TouchableOpacity
                style={{ alignSelf: 'center' }}
                onPress={() => navigation.navigate('Signup')}>
                <Text base2 primary>
                  {' '}
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View style={[styles.bottomContainer, styles.flexCol]}>
          <Text base2Medium n600>
            By signing up, you agree to our and{' '}
          </Text>
          <View style={styles.flexRow}>
            <TouchableOpacity>
              <Text captionMedium primary>
                Terms & Conditions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 10 }}>
              <Text captionMedium primary>
                Privacy policy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </WrappedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  flexCol: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
    gap: 8,
  },
  wrapper: {
    marginHorizontal: 16,
    marginTop: 24,
    padding: 16,
    gap: 8,
    borderRadius: 12,
  },
  socialButtons: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 8,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  bottomContainer: {
    padding: 16,
    width: '100%',
    alignSelf: 'flex-end',
  },
  image: {
    width: '100%',
    aspectRatio: 2,
    height: 'auto',
    // height: 'auto',
  },
});
export default LoginScreen;
