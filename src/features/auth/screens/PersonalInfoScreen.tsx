import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { authApi } from '../../../api';
import { Button, Text, TextInput, View } from '../../../components';
import WrappedView from '../../../components/WrappedView';
import { useTheme } from '../../../theme/ThemeContext';
import { UserTypes } from '../../../types';
import { logInUser } from '../authSlice';
import Toast from 'react-native-toast-message';
import { errors } from '../../../utils';

const PersonalInfoScreen: React.FC = () => {
  const { colors } = useTheme();
  const route = useRoute();
  const [agree, setAgree] = React.useState(false);
  const { registrationToken } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] =
    React.useState<UserTypes.UserRegisterForm>({
      name: '',
      password: '',
      confirmPassword: '',
      email: '',
    });

  const inputChangeHandler = (value: string, key: string) => {
    setUserDetails((prev: any) => {
      const newUserDetails = { ...prev };
      newUserDetails[key] = value;
      return newUserDetails;
    });
  };

  const registerUserHandler = async () => {
    if (userDetails.password !== userDetails.confirmPassword) {
      Toast.show({
        type: 'error',
        text1: errors.FRONT_001.id,
        text2: errors.FRONT_001.message,
      });
      return;
    }
    setLoading(true);
    const response = await authApi.registerUser(userDetails, registrationToken);
    if (response.data) {
      await AsyncStorage.setItem('login_token', response.data.login_token);
      dispatch(
        logInUser({
          loggedIn: true,
          loginToken: response.data.login_token,
          user: response.data.user,
          id: response.data.user.id,
          newUser: true,
        }),
      );
      navigation.navigate('UserRole', {
        loginToken: '',
        userDetails: {},
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: response.error,
      });
    }
    setLoading(false);
  };

  return (
    <WrappedView loadingStyle="overlay" isLoading={loading}>
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <ScrollView contentContainerStyle={{ width: '100%' }}>
          <View style={[styles.titleContainer]}>
            <Text h5 n800>
              Your personal info
            </Text>
            <Text base2 n600>
              Fill out the form below to create your account and start managing
              your finances effortlessly.
            </Text>
          </View>
          <View
            style={[
              styles.wrapper,
              {
                backgroundColor: colors.subBackground,
              },
            ]}>
            <TextInput
              type="user"
              placeholder="Your name"
              onChangeText={value => inputChangeHandler(value, 'name')}
            />
            <TextInput
              type="email"
              placeholder="Email "
              onChangeText={value => inputChangeHandler(value, 'email')}
            />
            <TextInput
              type="password"
              placeholder="Password"
              onChangeText={value => inputChangeHandler(value, 'password')}
            />
            <TextInput
              type="password"
              error={
                userDetails.password !== userDetails.confirmPassword
                  ? 'Password does not match'
                  : ''
              }
              placeholder="Confirm password"
              onChangeText={value =>
                inputChangeHandler(value, 'confirmPassword')
              }
            />

            <Button
              type="primary"
              style={{ marginTop: 24 }}
              onPress={async () => {
                await registerUserHandler();
              }}>
              <Text base blue50>
                Register
              </Text>
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </WrappedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  titleContainer: {
    marginTop: 24,
    gap: 8,
  },

  wrapper: {
    marginTop: 24,
    gap: 8,
    borderRadius: 12,
    padding: 16,
  },

  socialButtons: {
    marginTop: 24,
    flexDirection: 'row',
    gap: 8,
  },

  socialButton: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  flexRowStart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
});
export default PersonalInfoScreen;
