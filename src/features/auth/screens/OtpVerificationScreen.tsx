import React, { useEffect } from 'react';
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
  useNavigation,
} from '@react-navigation/native';
import { images } from '../../../utils';
import Header from '../../../components/Header.tsx';
import { OtpInput } from 'react-native-otp-entry';
import { AuthStackParamList } from '../../../navigation/types';
import WrappedView from '../../../components/WrappedView.tsx';
import { LoadingProps } from '../../../types/types.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store.ts';
import { setLoading } from '../../../reducers/utilssSlice.ts';

type OTPScreenRouteProp = RouteProp<AuthStackParamList, 'Otp'>;
type OTPScreenNavigationProp = NavigationProp<AuthStackParamList, 'Otp'>;
type Props = {
  route: OTPScreenRouteProp;
  navigation: OTPScreenNavigationProp;
};

const OtpVerificationScreen: React.FC<Props> = ({ route, navigation }) => {
  const { colors } = useTheme();
  const loading = useSelector((state: RootState) => state.utils.loading);
  const dispatch = useDispatch();

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
                Enter OTP sent to you phone number
              </Text>
              <TouchableOpacity>
                <Text captionMedium blue500>
                  Edit {route.params.phoneNumber}
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
              onTextChange={text => console.log(text)}
            />
            <Button
              type="primary"
              style={{ marginVertical: 24 }}
              onPress={() => navigation.navigate('Register')}>
              <Text base blue50>
                Verify OTP
              </Text>
            </Button>
          </View>
          <View style={styles.bottomContainer}>
            <Text caption n400>
              Didn't receive code ?
            </Text>
            <TouchableOpacity>
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
