import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { flatApi } from '../../../api';
import { Button, Text, View } from '../../../components';
import Empty from '../../../components/common/Empty.tsx';
import WrappedView from '../../../components/WrappedView.tsx';
import { setActiveFlat } from '../../../reducers/flatSlice.ts';
import { RootState } from '../../../store/store.ts';
import { useTheme } from '../../../theme/ThemeContext';
import { FlatTypes } from '../../../types';
import { setNewUser } from '../authSlice.ts';

const UserSocietyScreen: React.FC = () => {
  const { colors } = useTheme();

  const [socities, setSocities] = useState([]);
  const [userFlats, setUserFlats] = useState<
    FlatTypes.FlatDetailsResponseType[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = {};
  const [agree, setAgree] = React.useState(false);
  const auth = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const getUserFlats = async () => {
    setLoading(true);
    const response = await flatApi.getUserFlatList(auth.loginToken);

    if (response) {
      setUserFlats(response);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUserFlats().then().catch();
  }, []);

  const userFlatHandler = async (idx: number) => {
    setLoading(true);
    let selectedFlat = userFlats[idx];
    if (!selectedFlat) {
      return;
    }
    let activeFlat: FlatTypes.FlatDetailsType = {
      flatId: selectedFlat.flat_id,
      flatNo: selectedFlat.flat_no,
      blockNo: selectedFlat.block_no,
      societyId: selectedFlat.society_id,
      societyName: selectedFlat.society_name,
    };
    dispatch(setNewUser(false));
    dispatch(setActiveFlat(activeFlat));
    await AsyncStorage.removeItem('new_user');
    await AsyncStorage.setItem('active_flat', selectedFlat.flat_id);
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
        {/*<Header type="secondary" title="Register" />*/}
        <View style={{ flex: 1 }}>
          <View style={[styles.titleContainer]}>
            <Text h5 n800>
              Select Society
            </Text>
            <Text base2 n600>
              Please select your flat to continue
            </Text>
          </View>

          {userFlats.length > 0 ? (
            <View style={[styles.societyContainer]}>
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{ width: '100%' }}
                data={userFlats}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={[
                      styles.societyCard,
                      { backgroundColor: colors.subBackground },
                    ]}
                    onPress={async () => {
                      await userFlatHandler(index);
                    }}>
                    <Text base n600>
                      {' '}
                      Flat no:{item.flat_no} Block no:{item.block_no}
                    </Text>
                    <Text base n700>
                      {' '}
                      {item.society_name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          ) : (
            <Empty
              title="Empty flats"
              subTitle="We dont find any flat registered with us "
            />
          )}
          <Button
            type="primary"
            style={{ marginVertical: 20 }}
            onPress={() => navigation.navigate('RegisterResident')}>
            <Text base blue50>
              Register your new flat
            </Text>
          </Button>
          <Text base2 style={{ textAlign: 'center' }}>
            Or
          </Text>

          <Button
            type="secondary"
            style={{ marginVertical: 20 }}
            onPress={() => navigation.navigate('RegisterSociety')}>
            <Text base primary>
              Register new society
            </Text>
          </Button>
        </View>
      </SafeAreaView>
    </WrappedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  titleContainer: {
    marginTop: 24,
    gap: 8,
  },

  wrapper: {
    marginTop: 24,
    gap: 8,
    borderRadius: 12,
  },
  societyContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  societyCard: {
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
  },
  flexRowStart: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default UserSocietyScreen;
