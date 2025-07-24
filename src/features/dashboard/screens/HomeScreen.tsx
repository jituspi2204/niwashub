import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Header, View } from '../../../components';
import { useTheme } from '../../../theme/ThemeContext.tsx';
import { useNavigation } from '@react-navigation/native';
import Section from '../components/Section.tsx';
import Services from '../components/Services.tsx';
import DashboardHeader from '../components/DashboardHeader.tsx';
import { flatApi } from '../../../api/index.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store.ts';
import { setFlatList } from '../../../reducers/flatSlice.ts';
import {
  FlatDetailsResponseType,
  FlatDetailsType,
} from '../../../types/flat.types.ts';
import { setLoading } from '../../../reducers/utilssSlice.ts';
import Toast from 'react-native-toast-message';

const HomeScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const auth = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState<boolean>(false);
  const userFlatList = useSelector((state: RootState) => state.flat.flatList);
  const flatStore = useSelector((state: RootState) => state.flat);
  const dispatch = useDispatch();

  const getFlats = async () => {
    setLoading(true);
    let response = await flatApi.getUserFlatList(auth.loginToken);
    if (response.data) {
      let flatList: any[] = response.data.map(
        (val: FlatDetailsResponseType) => ({
          flatId: val.flat_id,
          flatNo: val.flat_no,
          blockNo: val.block_no,
          societyId: val.society_id,
          societyName: val.society_name,
        }),
      );
      if (flatStore.activeFlatId) {
        let index = flatList.findIndex(
          flat => flat.flatId == flatStore.activeFlatId,
        );
        if (index >= 0) {
          let removedFlat = flatList[index];
          flatList.splice(index, 1);
          flatList.unshift(removedFlat);
        }
      }
      dispatch(setFlatList(flatList));
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: response.error,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getFlats()
      .then(() => {})
      .catch(err => {});
  }, []);

  return (
    <View
      safe
      style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <DashboardHeader flats={userFlatList} />
      <Section title="Community">
        <Services />
      </Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    borderBottomWidth: 0.2,
  },
  balance: {
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },

  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  button: {
    marginTop: 24,
    width: Dimensions.get('window').width - 32,
  },

  content: {
    paddingBottom: 64,
  },

  card: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },

  title: {
    marginHorizontal: 16,
  },

  addBill: {
    borderWidth: 0.5,
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  transactions: {
    marginTop: 16,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    gap: 16,
  },

  buttonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
  },

  toast: {
    position: 'absolute',
    zIndex: 99,
    bottom: 24,
  },
});

export default HomeScreen;
