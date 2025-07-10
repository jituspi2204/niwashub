import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../../theme/ThemeContext.tsx';
import { Button, Text, View } from '../../../components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import WrappedView from '../../../components/WrappedView.tsx';
import Toast from 'react-native-toast-message';
import { PhoneInput } from '../../../components/input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store.ts';
import { AuthStackParamList } from '../../../navigation/types.ts';
import { authApi } from '../../../api';

const ForgotPasswordScreen: React.FC = ({}) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [phoneNumber, setPhoneNumber] = React.useState<string>('');
  const dispatch = useDispatch();
  const phoneOnChangeHandler = (value: string) => {
    setPhoneNumber(value);
  };

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
      'FORGOT_PASSWORD',
    );
    if (response) {
      navigation.navigate('Otp', {
        phoneNumber,
        verificationId: '',
        otpFor: 'FORGOT_PASSWORD',
      });
    }
    setLoading(false);
  };
  return (
    <WrappedView isLoading={loading} loadingStyle="overlay">
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
              Forgot Password
            </Text>
            <Text base2 n600>
              No worries! Just tell us your phone number and we’ll help you get
              back in.
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
              onPress={async () => {
                await sendOtpHandler();
              }}>
              <Text base blue50>
                Continue
              </Text>
            </Button>
            <View style={[styles.flexRow, { justifyContent: 'center' }]}>
              <Text base2>Remember password?</Text>
              <TouchableOpacity style={{ alignSelf: 'center' }}>
                <Text base2 primary>
                  {' '}
                  Login
                </Text>
              </TouchableOpacity>
            </View>
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
export default ForgotPasswordScreen;
