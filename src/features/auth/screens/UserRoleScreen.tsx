import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
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
import { images } from '../../../utils/images.ts';
import { content } from '../../../utils/index.ts';
import { setUserRole } from '../authSlice.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserRoleScreen: React.FC = ({}) => {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const roleHandler = async (role: any) => {
    await AsyncStorage.setItem('role', role);
    dispatch(setUserRole(role));
  };

  const getRoleContainer = (item: any) => {
    return (
      <TouchableOpacity
        style={[
          styles.wrapper,
          {
            backgroundColor: colors.subBackground,
          },
        ]}
        onPress={async () => await roleHandler(item.role)}>
        <View style={{ width: '30%' }}>
          <Image
            source={item.imageSrc}
            style={styles.image}
            resizeMode="contain"
            resizeMethod="auto"
          />
        </View>
        <View style={{ width: '70%' }}>
          <Text h6 n800 style={{ textAlign: 'left' }}>
            {item.title}
          </Text>
          <Text caption2 style={{ textAlign: 'left' }}>
            {item.subTitle}
          </Text>
        </View>
      </TouchableOpacity>
    );
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
              Login as
            </Text>
            <Text base2 n600>
              Select your role to continue
            </Text>
          </View>
          {content.userRoles.map(item => getRoleContainer(item))}
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
    height: 150,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 'auto',
    height: '100%',
  },
});
export default UserRoleScreen;
