import { useNavigation } from '@react-navigation/native';
import React, { act, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { bootstrapApi, flatApi, societyApi } from '../../../api/index.ts';
import { Button, Text, View } from '../../../components/index.ts';
import Header from '../../../components/Header.tsx';
import SearchSelectInput from '../../../components/input/SearchSelectInput.tsx';
import WrappedView from '../../../components/WrappedView.tsx';
import { useTheme } from '../../../theme/ThemeContext.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store.ts';
import Toast from 'react-native-toast-message';

const RegisterResidentScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [active, setActive] = React.useState({
    state: '',
    city: '',
    society: '',
    flat: '',
  });
  const [states, setStates] = React.useState<[]>([]);
  const [cities, setCities] = React.useState<[]>([]);
  const [socities, setSocities] = React.useState<[]>([]);
  const [flats, setFlats] = React.useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFlatId, setSelectedFlatId] = useState<string>('');
  const auth = useSelector((state: RootState) => state.auth);

  const fetchState = async () => {
    let response = await bootstrapApi.getStates();
    setStates(
      response.map(val => ({
        label: val.state,
        value: val.state,
      })),
    );
  };

  const fetchCities = async (state: string) => {
    setLoading(true);
    let response = await bootstrapApi.getCitiesForState(state);
    response.sort((a: any, b: any) => a.city.localeCompare(b.city));
    setCities(response.map(val => ({ label: val.city, value: val.city })));
    setLoading(false);
  };

  const fetchSocieties = async (city: string, state: string) => {
    setLoading(true);
    let repsonse = await societyApi.getAllSocitiesFromCity(city, state);
    setSocities(
      repsonse.map(val => ({
        value: val.society_id,
        label: `${val.society_name} - ${val.society_address}`,
      })),
    );
    setLoading(false);
  };

  const fetchBlockAndFlats = async (societyId: string) => {
    setLoading(true);
    let response = await flatApi.fetchBlockAndFlatsForSociety(societyId);
    console.log('response for flat: ', response);

    if (response.data) {
      let newFlats = response.data.map(flat => ({
        value: flat.flat_id,
        label: `${flat.flat_no} / ${flat.block_no}`,
      }));
      setFlats(newFlats);
    }
    setLoading(false);
  };

  const addFlatHandler = async () => {
    setLoading(true);
    let response = await flatApi.registerFlatRequest(
      selectedFlatId,
      auth.loginToken,
    );
    if (response.data) {
      Toast.show({
        type: 'success',
        text1: 'Request created',
        visibilityTime: 3000,
        onHide: () => navigation.goBack(),
        text2:
          'You will be member of society when your request is accepted by society admin',
      });
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
    setLoading(true);
    fetchState().then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <WrappedView isLoading={loading} loadingStyle="overlay">
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <ScrollView>
          <View style={[styles.titleContainer]}>
            <Text base2 n600>
              Fill out the form below to register your flat with society
            </Text>
          </View>
          <View style={[styles.wrapper]}>
            <SearchSelectInput
              options={states}
              label="State"
              placeholder={active.state || 'Click to select'}
              onSelect={async val => {
                setActive(prev => ({ ...prev, state: val.value }));
                await fetchCities(val.value);
              }}
            />
            <SearchSelectInput
              options={cities}
              label="City"
              placeholder={active.city || 'Click to select'}
              onSelect={async val => {
                setActive(prev => ({ ...prev, city: val.label }));
                await fetchSocieties(val.value, active.state);
              }}
            />
            <SearchSelectInput
              options={socities}
              label="Society"
              placeholder={active.society || 'Click to select'}
              onSelect={async val => {
                setActive(prev => ({ ...prev, society: val.label }));
                let selectedSocietyId = -1;
                // for(let i = 0; i < socities.length;i++){
                //   if(socities[i].label == )
                // }
                await fetchBlockAndFlats(val.value);
              }}
            />

            <SearchSelectInput
              options={flats}
              label="Flat No"
              placeholder={active.flat || 'Click to select'}
              onSelect={val => {
                setActive(prev => ({ ...prev, flat: val.label }));
                setSelectedFlatId(val.value);
              }}
            />

            <Button
              type="primary"
              style={{ marginTop: 24 }}
              onPress={addFlatHandler}>
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
});
export default RegisterResidentScreen;
