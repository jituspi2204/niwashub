import React, { act, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { View, Text, TextInput, Button } from '../../../components';
import { useTheme } from '../../../theme/ThemeContext';
import Icons from 'react-native-vector-icons/Feather';
import SearchSelectInput from '../../../components/input/SearchSelectInput';
import WrappedView from '../../../components/WrappedView';
import { bootstrapApi, societyApi } from '../../../api';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import { SocietyTypes } from '../../../types';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';

const RegisterSocietyScreen: React.FC = () => {
  const { colors } = useTheme();
  const router = {};
  const [agree, setAgree] = React.useState(false);
  const [societyDetails, setSocietyDetails] = useState({
    name: '',
    address: '',
    description: '',
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [acitve, setActive] = React.useState({ city: '', state: '' });
  const [cities, setCities] = React.useState<[]>([]);
  const [states, setStates] = React.useState<[]>([]);
  const [societyImage, setSocietyImage] = useState<any>();
  const navgiation = useNavigation();
  const auth = useSelector((state: RootState) => state.auth);

  const fetchCities = async (state: string) => {
    setLoading(true);
    let response = await bootstrapApi.getCitiesForState(state);
    response.sort((a: any, b: any) => a.city.localeCompare(b.city));
    setCities(response.map(val => ({ label: val.city, value: val.city })));
    setLoading(false);
  };

  const fetchState = async () => {
    setLoading(true);
    let response = await bootstrapApi.getStates();
    setStates(
      response.map(val => ({
        label: val.state,
        value: val.state,
      })),
    );
    setLoading(false);
  };

  const handleSocietyDetailsInput = (key: string, value: string) => {
    setSocietyDetails(prev => {
      let newSocietyDetails = { ...prev };
      newSocietyDetails[key] = value;
      return newSocietyDetails;
    });
  };

  const registerSocietyHandler = async () => {
    setLoading(true);
    const societyForm: SocietyTypes.SocietyRegisterDTO = {
      name: societyDetails.name,
      description: societyDetails.description,
      address: societyDetails.address,
      state: acitve.state,
      city: acitve.city,
      pincode: '123456',
    };
    let response = await societyApi.registerSociety(
      societyForm,
      auth.loginToken,
    );
    if (response) {
      navgiation.navigate('RegisterFlats', {
        societyDetails: response,
      });
    }
    setLoading(false);
  };

  const imageHandler = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.errorCode) {
      } else {
        let uri = response.assets?.[0]?.uri;
        setSocietyImage(uri || null);
      }
    });
  };

  useEffect(() => {
    fetchState().then(() => {});
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
        <ScrollView contentContainerStyle={{ width: '100%' }}>
          <View style={[styles.titleContainer]}>
            <Text h5 n800>
              Register society
            </Text>
            <Text base2 n600>
              Fill out the form below to register your society
            </Text>
          </View>
          <View
            style={[
              styles.wrapper,
              {
                backgroundColor: colors.subBackground,
              },
            ]}>
            <TouchableOpacity
              style={[styles.imageContainer, { backgroundColor: colors.n200 }]}
              onPress={imageHandler}>
              {societyImage ? (
                <Image
                  source={{ uri: societyImage }}
                  style={{ width: '100%', height: '100%', borderRadius: 100 }}
                  resizeMode="cover"
                  resizeMethod="auto"
                />
              ) : (
                <Icons name="image" size={50} color={colors.n500} />
              )}
            </TouchableOpacity>
            <TextInput
              placeholder="Society name"
              value={societyDetails.name}
              iconLeft="home"
              onChangeText={value => handleSocietyDetailsInput('name', value)}
            />
            <TextInput
              placeholder="Society description "
              iconLeft="file-text"
              value={societyDetails.description}
              onChangeText={value =>
                handleSocietyDetailsInput('description', value)
              }
            />
            <TextInput
              placeholder="Society address"
              iconLeft="map"
              value={societyDetails.address}
              onChangeText={value =>
                handleSocietyDetailsInput('address', value)
              }
            />
            <SearchSelectInput
              options={states}
              label="State"
              placeholder={acitve.state || 'Click to select'}
              onSelect={async value => {
                setActive(prev => ({ ...prev, state: value }));
                await fetchCities(value);
              }}
            />
            <SearchSelectInput
              options={cities}
              label="City"
              placeholder={acitve.city || 'Click to select'}
              onSelect={async value => {
                setActive(prev => ({ ...prev, city: value }));
              }}
            />

            <Button
              type="primary"
              style={{ marginTop: 24 }}
              onPress={registerSocietyHandler}>
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
    padding: 20,
  },

  titleContainer: {
    marginTop: 16,
    gap: 8,
  },

  wrapper: {
    marginTop: 24,
    gap: 8,
    borderRadius: 12,
    padding: 16,
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
export default RegisterSocietyScreen;
