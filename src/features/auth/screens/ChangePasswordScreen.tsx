import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext.tsx';
import { Button, Text, View } from '../../../components';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import WrappedView from '../../../components/WrappedView.tsx';
import Toast from 'react-native-toast-message';
import { TextInput } from '../../../components/input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store.ts';
import { AuthStackParamList } from '../../../navigation/types.ts';
import { setLoading } from '../../../reducers/utilssSlice.ts';
import { authApi } from '../../../api/index.ts';

const ChangePasswordScreen: React.FC = ({}) => {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [newPassword, setNewPassword] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const route = useRoute();

  const changePasswordHandler = async () => {
    console.log(route?.params?.forgotPasswordToken);
    
    setLoading(true);
    let response = await authApi.changeUserPassword(
      newPassword,
      route?.params?.forgotPasswordToken,
    );
    if (response) {
      navigation.navigate('Login');
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
            <TextInput
              type="password"
              placeholder="Enter new password"
              onChangeText={val => setNewPassword(val)}
            />
            <TextInput type="password" placeholder="Confirm password" />
            <Button
              type="primary"
              style={{ marginVertical: 20 }}
              onPress={async () => {
                await changePasswordHandler();
              }}>
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
