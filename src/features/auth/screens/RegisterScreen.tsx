import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../../theme/ThemeContext.tsx';
import { Button, HeadingWithLine, Icon, Text, View } from '../../../components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { images } from '../../../utils';
import WrappedView from '../../../components/WrappedView.tsx';
import Toast from 'react-native-toast-message';
import { PhoneInput, TextInput } from '../../../components/input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store.ts';
import { setLoading } from '../../../reducers/utilssSlice.ts';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import DeviceInfo from 'react-native-device-info';
import { AuthStackParamList } from '../../../navigation/types.ts';

const RegisterScreen: React.FC = ({}) => {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [phoneNumber, setPhoneNumber] = React.useState<string>('');
  const loading = useSelector((state: RootState) => state.utils.loading);
  const dispatch = useDispatch();
  const phoneOnChangeHandler = (value: string) => {
    setPhoneNumber(value);
  };

  const sendOtpHandler = async () => {
    // Validate phone number
    if (!phoneNumber || phoneNumber.length < 8) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid phone number',
      });
      return;
    }
    console.log('phoneNumber : ', phoneNumber);

    try {
      dispatch(
        setLoading({ active: true, message: 'Sending OTP...' })
      );

      // Check if running on emulator
      const emulator = DeviceInfo.isEmulatorSync();

      if (emulator) {
        console.log('Running on emulator, using mock verification');

        // For emulators, create a mock verification ID
        try {
          console.log('Navigating to Otp with:', {
            phoneNumber,
            verificationId: 'emulator-verification-id',
            isEmulator: true,
          });
          navigation.navigate('Otp', {
            phoneNumber,
            verificationId: 'emulator-verification-id',
            isEmulator: true,
          });
        } catch (error) {
          console.error('Navigation error:', error);
        }


        dispatch(setLoading({ active: false, message: '' }));
        Toast.show({
          type: 'success',
          text1: 'Emulator detected. Use 123456 or 1234 as OTP for testing.',
        });
        return;
      }

      // Request OTP verification for real devices
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);

      // Store confirmation in state management or pass to OTP screen
      navigation.navigate('Otp', {
        phoneNumber,
        verificationId: confirmation.verificationId,
        isEmulator: false,
      });

      dispatch(setLoading({ active: false, message: '' }));
      Toast.show({
        type: 'success',
        text1: 'OTP sent successfully',
      });
    } catch (error) {
      console.error('Error sending OTP:', error);
      dispatch(setLoading({ active: false, message: '' }));
      Toast.show({
        type: 'error',
        text1: 'Failed to send OTP. Please try again.',
      });
    }
  };

  const signInWithGoogle = async () => {
    try {
      dispatch(
        setLoading({ active: true, message: 'Signing in with Google...' }),
      );
      const idToken = await GoogleSignin.signIn();
      console.log('idToken : ', idToken);
      const googleCredential = auth.GoogleAuthProvider.credential(
        idToken.data?.idToken!,
      );
      await auth().signInWithCredential(googleCredential);
      dispatch(setLoading({ active: false, message: '' }));
      Toast.show({ type: 'success', text1: 'Signed in with Google' });
      // navigate to your home/dashboard screen here
    } catch (error) {
      console.log('error : ', error);
      dispatch(setLoading({ active: false, message: '' }));
      Toast.show({ type: 'error', text1: 'Google sign-in failed' });
    }
  };

  return (
    <WrappedView isLoading={loading.active} loadingText={loading.message}>
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
              Register yourself
            </Text>
            <Text base2 n600 style={{textAlign : "justify"}}>
              Enter your phone number to create your account and start
              managing your society effortlessly.
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
              onChangeText={phoneOnChangeHandler}
            />
            <Button
              type="primary"
              style={{ marginVertical: 20 }}
              onPress={() => navigation.navigate("Otp", {phoneNumber})}>
              <Text base blue50>
                Send OTP
              </Text>
            </Button>
            <View style={[styles.flexRow, {justifyContent: "center"}]}>
              <Text base2>
                Already have account?
              </Text>
              <TouchableOpacity style={{ alignSelf : "center" }}>
                <Text base2 primary>
                  {" "} Login
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
    padding : 20,
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
    marginTop: 24,
    gap: 8,
  },
  wrapper: {
    marginHorizontal: 16,
    marginTop: 24,
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
export default RegisterScreen;
