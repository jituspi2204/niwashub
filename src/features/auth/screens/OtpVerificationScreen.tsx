import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../../theme/ThemeContext.tsx';
import { Button, HeadingWithLine, Text, View } from '../../../components';
import {
  NavigationProp,
  RouteProp,
} from '@react-navigation/native';
import { images } from '../../../utils';
import { OtpInput } from 'react-native-otp-entry';
import { AuthStackParamList } from '../../../navigation/types';
import WrappedView from '../../../components/WrappedView.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store.ts';
import { setLoading } from '../../../reducers/utilssSlice.ts';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import { logInUser } from '../authSlice';
import { useRoute, useNavigation } from '@react-navigation/native';

const OtpVerificationScreen: React.FC = () => {
  console.log('OtpVerificationScreen');
  const route = useRoute<RouteProp<AuthStackParamList, 'Otp'>>();
  const navigation = useNavigation<NavigationProp<AuthStackParamList, 'Otp'>>();
  const { colors } = useTheme();
  const loading = useSelector((state: RootState) => state.utils.loading);
  const dispatch = useDispatch();
  const [otpCode, setOtpCode] = useState('');

  // Get parameters from route params
  const { phoneNumber, verificationId, isEmulator } = route.params;
  const verifyOtpHandler = async () => {
    if (otpCode.length !== 6) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid 6-digit OTP',
      });
      return;
    }

    try {
      dispatch(
        setLoading({ active: true, message: 'Verifying OTP...' })
      );

      // For emulators, use a special flow with hardcoded OTPs
      if (isEmulator) {
        console.log('Emulator detected, using mock verification');

        // Check if OTP is one of the accepted test values
        if (otpCode === '123456' || otpCode === '1234') {
          // Create a mock user for testing
          const mockUser = {
            uid: 'emulator-user-id',
            phoneNumber: phoneNumber,
            // Add other user properties as needed
          };

          // Update Redux state with mock user
          dispatch(logInUser(mockUser));
          dispatch(setLoading({ active: false, message: '' }));

          Toast.show({
            type: 'success',
            text1: 'Phone number verified successfully (Emulator)',
          });

          // Navigate to the next screen
          navigation.navigate('Register');
        } else {
          dispatch(setLoading({ active: false, message: '' }));
          Toast.show({
            type: 'error',
            text1: 'Invalid OTP. Please use 123456 or 1234 for testing.',
          });
        }
        return;
      }

      // For real devices, proceed with actual verification
      const credential = auth.PhoneAuthProvider.credential(
        verificationId,
        otpCode
      );

      // Sign in with the credential
      const userCredential = await auth().signInWithCredential(credential);

      // User is signed in
      const user = userCredential.user;

      // Update Redux state
      dispatch(logInUser(user));
      dispatch(setLoading({ active: false, message: '' }));

      Toast.show({
        type: 'success',
        text1: 'Phone number verified successfully',
      });

      // Navigate to the next screen
      navigation.navigate('Register');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      dispatch(setLoading({ active: false, message: '' }));
      Toast.show({
        type: 'error',
        text1: 'Invalid OTP. Please try again.',
      });
    }
  };

  const resendOtp = async () => {
    try {
      dispatch(
        setLoading({ active: true, message: 'Resending OTP...' })
      );

      // For emulators, just show a success message
      if (isEmulator) {
        dispatch(setLoading({ active: false, message: '' }));
        Toast.show({
          type: 'success',
          text1: 'Mock OTP resent. Use 123456 or 1234 for testing.',
        });
        return;
      }

      // For real devices, request a new OTP
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);

      // Update verification ID in route params
      route.params.verificationId = confirmation.verificationId;

      dispatch(setLoading({ active: false, message: '' }));
      Toast.show({
        type: 'success',
        text1: 'OTP resent successfully',
      });
    } catch (error) {
      console.error('Error resending OTP:', error);
      dispatch(setLoading({ active: false, message: '' }));
      Toast.show({
        type: 'error',
        text1: 'Failed to resend OTP. Please try again.',
      });
    }
  };

  return (
    <WrappedView isLoading={loading.active} loadingText={loading.message}>
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: colors.n100,
          },
        ]}>
        <ScrollView contentContainerStyle={{ width: '100%' }}>
          <Image source={images.img3} style={styles.image} />
          <View style={[styles.titleContainer]}>
            <Text h5 n700>
              Manage. Connect. Live Better.
            </Text>
          </View>
          <View
            style={[
              styles.wrapper,
              {
                backgroundColor: colors.n50,
              },
            ]}>
            <HeadingWithLine
              title="OTP Verification"
              style={{ marginVertical: 10 }}
            />
            <View style={styles.box}>
              <Text caption n400>
                Enter OTP sent to your phone number
              </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text captionMedium blue500>
                  Edit {phoneNumber}
                </Text>
              </TouchableOpacity>
            </View>

            <OtpInput
              numberOfDigits={6}
              theme={{
                focusedPinCodeContainerStyle: {
                  borderColor: colors.primary,
                },
              }}
              onTextChange={text => setOtpCode(text)}
            />
            <Button
              type="primary"
              style={{ marginVertical: 24 }}
              onPress={verifyOtpHandler}>
              <Text base blue50>
                Verify OTP
              </Text>
            </Button>
          </View>
          <View style={styles.bottomContainer}>
            <Text caption n400>
              Didn't receive code ?
            </Text>
            <TouchableOpacity onPress={resendOtp}>
              <Text captionMedium blue500>
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
  },

  titleContainer: {
    paddingHorizontal: 16,
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
