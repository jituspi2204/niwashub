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
import { flatApi } from '../../../api/index.ts';
import { Button, Text, View } from '../../../components/index.ts';
import Empty from '../../../components/common/Empty.tsx';
import WrappedView from '../../../components/WrappedView.tsx';
import { setActiveFlat } from '../../../reducers/flatSlice.ts';
import { RootState } from '../../../store/store.ts';
import { useTheme } from '../../../theme/ThemeContext.tsx';
import { FlatTypes } from '../../../types/index.ts';
import { setNewUser } from '../../auth/authSlice.ts';

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

  const flatStore = useSelector((state: RootState) => state.flat);

  const userFlatHandler = async (idx: number) => {
    setLoading(true);
    let selectedFlat = flatStore.flatList[idx];
    if (!selectedFlat) {
      return;
    }
    dispatch(setActiveFlat(selectedFlat));
    await AsyncStorage.setItem('active_flat', selectedFlat.flatId);
    setLoading(false);
    navigation.goBack();
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
            <Text base2 n800>
              Please select your flat to continue
            </Text>
          </View>

          {flatStore.flatList.length > 0 ? (
            <View style={[styles.societyContainer]}>
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{ width: '100%' }}
                data={flatStore.flatList}
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
                      Flat no:{item.flatNo} Block no:{item.blockNo}
                    </Text>
                    <Text base n700>
                      {' '}
                      {item.societyName}
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
            onPress={() => navigation.navigate('RegisterFlat')}>
            <Text base blue50>
              Register your new flat
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
