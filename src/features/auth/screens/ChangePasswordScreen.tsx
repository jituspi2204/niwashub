import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext.tsx';
import { Button, Text, View } from '../../../components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import WrappedView from '../../../components/WrappedView.tsx';
import Toast from 'react-native-toast-message';
import { TextInput } from '../../../components/input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store.ts';
import { AuthStackParamList } from '../../../navigation/types.ts';

const ChangePasswordScreen: React.FC = ({}) => {
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
              Update Password
            </Text>
            <Text base2 n600>
              Enter your new password below to reset your account
            </Text>
          </View>
          <View
            style={[
              styles.wrapper,
              {
                backgroundColor: colors.subBackground,
              },
            ]}>
            <TextInput type="password" placeholder="Enter new password" />
            <TextInput type="password" placeholder="Confirm password" />
            <Button
              type="primary"
              style={{ marginVertical: 20 }}
              onPress={() =>
                navigation.navigate('UserSociety', { phoneNumber })
              }>
              <Text base blue50>
                Change password
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
export default ChangePasswordScreen;
