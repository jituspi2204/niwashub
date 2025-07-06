import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
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
import { PhoneInput } from '../../../components/input';
import WrappedView from '../../../components/WrappedView.tsx';
import { AuthStackParamList } from '../../../navigation/types.ts';
import { useTheme } from '../../../theme/ThemeContext.tsx';

const SignupScreen: React.FC = ({}) => {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [phoneNumber, setPhoneNumber] = React.useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const sendOtpHandler = async () => {
    // Validate phone number
    setLoading(true);
    if (!phoneNumber || phoneNumber.length < 8) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid phone number',
      });
      return;
    }
    const response = await authApi.sendOtpForVerification(
      phoneNumber,
      'REGISTER',
    );
    console.log('otp response', response);

    if (response) {
      navigation.navigate('Otp', {
        phoneNumber,
        verificationId: '',
        otpFor: 'REGISTER',
      });
    }
    setLoading(false);
  };

  return (
    <WrappedView isLoading={loading} loadingText={''}>
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
              Welcome!
            </Text>
            <Text base2 n600>
              Register with us to manage your society in smarter way
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
            <Button
              type="primary"
              style={{ marginVertical: 20 }}
              onPress={sendOtpHandler}>
              <Text base blue50>
                Login
              </Text>
            </Button>
            <View style={[styles.flexRow, { justifyContent: 'center' }]}>
              <Text base2>Already registered?</Text>
              <TouchableOpacity
                style={{ alignSelf: 'center' }}
                onPress={() => navigation.navigate('Login')}>
                <Text base2 primary>
                  {' '}
                  Login
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
export default SignupScreen;
