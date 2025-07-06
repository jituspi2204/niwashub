import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { bootstrapApi } from '../../../api/index.ts';
import { Button, Text, View } from '../../../components';
import Header from '../../../components/Header';
import SearchSelectInput from '../../../components/input/SearchSelectInput.tsx';
import WrappedView from '../../../components/WrappedView.tsx';
import { useTheme } from '../../../theme/ThemeContext';

const RegisterResidentScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const router = {};
  const [agree, setAgree] = React.useState(false);
  const [active, setActive] = React.useState({ state: '', city: '' });
  const [states, setStates] = React.useState<[]>([]);
  const [cities, setCities] = React.useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
    console.log('res', response);

    setCities(response.map(val => ({ label: val.city, value: val.city })));
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
        <Header type="secondary" title="Register new flat" />
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
              placeholder={active.state}
              onSelect={async value => {
                setActive(prev => ({ ...prev, state: value }));
                await fetchCities(value);
              }}
            />
            <SearchSelectInput
              options={cities}
              label="City"
              onSelect={() => {}}
            />
            <SearchSelectInput
              options={[]}
              label="Society"
              onSelect={() => {}}
            />
            <SearchSelectInput
              options={[]}
              label="Block No"
              onSelect={() => {}}
            />
            <SearchSelectInput
              options={[]}
              label="Flat No"
              onSelect={() => {}}
            />

            <Button
              type="primary"
              style={{ marginTop: 24 }}
              onPress={() => navigation.navigate('Dashboard')}>
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
