import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { View, Text, TextInput, Button } from '../../../components';
import { useTheme } from '../../../theme/ThemeContext';
import Icon from '../../../components/Icon';
import Header from '../../../components/Header';
import WrappedView from '../../../components/WrappedView';
import { useRoute } from '@react-navigation/native';
import { flatApi } from '../../../api';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const RegisterFlatsScreen: React.FC = () => {
  const { colors } = useTheme();
  const router = {};
  const [agree, setAgree] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [flats, setFlats] = useState<[]>([]);
  const [flatNo, setFlatNo] = useState<string>('');
  const [blockNo, setBlockNo] = useState<string>('');
  const route = useRoute();
  const auth = useSelector((state: RootState) => state.auth);

  const deleteFlatHandler = (idx: number) => {
    setFlats(prev => {
      let newFlats = [...prev];
      newFlats.splice(idx, 1);
      return newFlats;
    });
  };

  const getFlatContainer = (idx: number, flatNo: string, blockNo: string) => {
    return (
      <TouchableOpacity
        style={[styles.flatContainer, { borderColor: colors.primary }]}
        onPress={() => deleteFlatHandler(idx)}>
        <Text h6>
          {flatNo} / {blockNo}
        </Text>
      </TouchableOpacity>
    );
  };

  const addFlatHandler = () => {
    if (flatNo) {
      setFlats(prev => [...prev, { flatNo: flatNo, blockNo: blockNo }]);
    }
  };

  const regiserFlats = async () => {
    setLoading(true);
    if (route.params?.societyId) {
      let flatList = flats.map(val => ({
        flat_no: val.flatNo,
        block_no: val.blockNo,
      }));
      let response = await flatApi.registerFlats(
        route.params?.societyDetails?.id,
        flatList,
        auth.loginToken,
      );
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
        <Header type="secondary" title="Register" />
        <ScrollView>
          <View style={[styles.titleContainer]}>
            <Text h5 n700>
              Add flats for your society
            </Text>
            <Text base2Medium n400>
              Add flat by entering flat no and block no, to remove flat, click
              on the flat name
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
              type="default"
              placeholder="Flat no"
              style={{ width: '35%' }}
              onChangeText={value => setFlatNo(value)}
            />
            <TextInput
              type="default"
              placeholder="Block no"
              style={{ width: '35%' }}
              onChangeText={value => setBlockNo(value)}
            />

            <Button
              type="primary"
              style={{ marginTop: 24, width: '25%' }}
              onPress={addFlatHandler}>
              <Text base blue50>
                Add
              </Text>
            </Button>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: 24,
              flexWrap: 'wrap',
            }}>
            {flats.map((value, index) =>
              getFlatContainer(index, value.flatNo, value.blockNo),
            )}
          </View>
        </ScrollView>
        <Button
          type="primary"
          style={{ marginVertical: 12, alignSelf: 'center', width: '96%' }}
          onPress={regiserFlats}>
          <Text base blue50>
            Register flats
          </Text>
        </Button>
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
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
  flatContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 12,
    width: 'auto',
    margin: 12,
  },
});

export default RegisterFlatsScreen;
