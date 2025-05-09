import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../../theme/ThemeContext.tsx';
import {
  Button,
  HeadingWithLine,
  Icon,
  Text,
  TextInput,
  View,
} from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { images } from '../../../utils';
import WrappedView from '../../../components/WrappedView.tsx';
import Toast from 'react-native-toast-message';
import { PhoneInput } from '../../../components/input';
import { LoadingProps } from '../../../types/types.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store.ts';
import { setLoading } from '../../../reducers/utilssSlice.ts';

const LoginScreen: React.FC = ({}) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = React.useState<string>('');
  const loading = useSelector((state: RootState) => state.utils.loading);
  const dispatch = useDispatch();
  const phoneOnChangeHandler = (value: string) => {
    setPhoneNumber(value);
  };

  const sendOtpHandler = () => {
    // if (!/^\s+$/.test(phoneNumber)) {
    //     Toast.show({
    //         type: 'error',
    //         text1: 'Invalid phone number',
    //     });
    //     return;
    // }
    // setLoading({loading: true, text: 'sending OTP ...'});
    dispatch(
      setLoading({ active: true, message: 'hold on, we are sending otp' }),
    );
    setTimeout(() => {
      navigation.navigate('Otp', { phoneNumber });
      dispatch(setLoading({ active: false, message: '' }));
    }, 1000);
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
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <ScrollView contentContainerStyle={{ width: '100%' }}>
          <Image
            source={images.img1}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={[styles.titleContainer]}>
            <Text h5 n700>
              Sign in to your account
            </Text>
            <Text caption n400>
              From daily expenses to long-term goals — plan it all in one app.
            </Text>
          </View>

          <View
            style={[
              styles.wrapper,
              {
                backgroundColor: colors.n50,
              },
            ]}>
            <PhoneInput
              placeholder="Phone number"
              onChangeText={phoneOnChangeHandler}
            />
            <Button
              type="primary"
              style={{ marginVertical: 24 }}
              onPress={sendOtpHandler}>
              <Text base blue50>
                Send OTP
              </Text>
            </Button>
            <HeadingWithLine
              title="or sign in with"
              style={{ marginVertical: 20 }}
            />
            <View style={[styles.socialButtons]}>
              <Button type="secondary" style={styles.socialButton}>
                <Icon name="google" size={24} />
                <Text base n700>
                  Google
                </Text>
              </Button>
            </View>
          </View>
        </ScrollView>
        <View style={[styles.bottomContainer, styles.flexCol]}>
          <Text caption n400>
            By signing up, you agree to our and{' '}
          </Text>
          <View style={styles.flexRow}>
            <TouchableOpacity>
              <Text captionMedium blue500>
                Terms & Conditions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 10 }}>
              <Text captionMedium blue500>
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
