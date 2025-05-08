import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Button, Text, TextInput, View } from '../../../components';
import { useTheme } from '../../../theme/ThemeContext';
import Header from '../../../components/Header';
import Icons from 'react-native-vector-icons/Feather';
import { NavigationProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../../navigation/types.ts';
import { useDispatch, useSelector } from 'react-redux';
import { logInUser } from '../authSlice.ts';
import WrappedView from '../../../components/WrappedView.tsx';
import { RootState } from '../../../store/store.ts';

type RegisterScreenNavigationProp = NavigationProp<
  AuthStackParamList,
  'Register'
>;
type Props = {
  // route: OTPScreenRouteProp;
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.utils.loading);
  const registerHandler = () => {
    dispatch(logInUser(true));
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
        <Header type="secondary" title="Register" />
        <ScrollView>
          <View style={[styles.titleContainer]}>
            <Text h5 n700>
              Enter your details
            </Text>
            <Text caption n400>
              Fill out the form below to create your account and start managing
              your finances effortlessly.
            </Text>
          </View>
          <View
            style={[
              styles.wrapper,
              {
                backgroundColor: colors.n50,
              },
            ]}>
            <TouchableOpacity
              style={[styles.imageContainer, { backgroundColor: colors.n200 }]}>
              <Icons name="image" size={50} color={colors.n500} />
            </TouchableOpacity>
            <Text
              caption
              n500
              style={{ alignSelf: 'center', marginBottom: 10 }}>
              Upload your image
            </Text>
            <TextInput type="user" placeholder="Your name" />
            <TextInput type="email" placeholder="Email" />
            <Button
              type="primary"
              style={{ marginTop: 24 }}
              onPress={registerHandler}>
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
  },

  titleContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
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
  flexRowStart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  imageContainer: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 200,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default RegisterScreen;
