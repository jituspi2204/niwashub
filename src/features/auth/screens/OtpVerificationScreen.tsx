import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { authApi } from '../../../api/index.ts';
import { Button, Text, View } from '../../../components';
import WrappedView from '../../../components/WrappedView.tsx';
import { AuthStackParamList } from '../../../navigation/types';
import { useTheme } from '../../../theme/ThemeContext.tsx';

const OtpVerificationScreen: React.FC = () => {
  const route = useRoute<RouteProp<AuthStackParamList, 'Otp'>>();
  const navigation = useNavigation<NavigationProp<AuthStackParamList, 'Otp'>>();
  const { colors } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [otpCode, setOtpCode] = useState('');

  // Get parameters from route params
  const { phoneNumber, verificationId, otpFor } = route.params;

  const verifyOtpHandler = async () => {
    if (otpCode.length !== 6) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid 6-digit OTP',
      });
      return;
    }
    setLoading(true);
    const response = await authApi.verifyOtp(phoneNumber, otpCode, otpFor);
    if (response) {
      console.log('registration token:', response);

      navigation.navigate('Register', {
        registrationToken: response,
      });
    }
    setLoading(false);
  };

  const resendOtp = async () => {};

  return (
    <WrappedView isLoading={loading} loadingStyle={'overlay'} loadingText={''}>
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <ScrollView contentContainerStyle={{ width: '100%' }}>
          <View style={[styles.titleContainer]}>
            <Text h5 n700>
              OTP Verfication
            </Text>
            <Text base2 n600>
              Please enter 6 digit code sent to your phone number
            </Text>
          </View>
          <View style={{ marginVertical: 16 }}>
            <OtpInput
              numberOfDigits={6}
              theme={{
                focusedPinCodeContainerStyle: {
                  borderColor: colors.primary,
                },
              }}
              onTextChange={text => setOtpCode(text)}
            />
          </View>
          <Button
            type="primary"
            style={{ marginVertical: 24 }}
            onPress={verifyOtpHandler}>
            <Text base blue50>
              Verify OTP
            </Text>
          </Button>
          <View style={styles.bottomContainer}>
            <Text base2 n600>
              Didn't receive code ?
            </Text>
            <TouchableOpacity onPress={resendOtp}>
              <Text base2 primary>
                {' '}
                Resend
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </WrappedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
  },

  titleContainer: {
    marginTop: 16,
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
    marginTop: 24,
    flexDirection: 'row',
    gap: 8,
  },

  socialButton: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  line: {
    flex: 1,
    height: 1,
  },
  section: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomContainer: {
    padding: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    alignSelf: 'flex-end',
  },
  image: {
    width: '100%',
    aspectRatio: 1.5,
    height: 'auto',

    // height: 'auto',
  },
  box: {
    padding: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});
export default OtpVerificationScreen;
