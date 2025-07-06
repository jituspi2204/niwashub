import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {View, Text, TextInput, Button} from '../../../components';
import {useTheme} from '../../../theme/ThemeContext';
import Icons from 'react-native-vector-icons/Feather';

const RegisterSocietyScreen: React.FC = () => {
  const {colors} = useTheme();
  const router = {};
  const [agree, setAgree] = React.useState(false);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}>
      <ScrollView contentContainerStyle={{width : "100%"}}>
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
            style={[styles.imageContainer, { backgroundColor: colors.n200 }]}>
            <Icons name="image" size={50} color={colors.n500} />
          </TouchableOpacity>
          <TextInput placeholder="Society name" iconLeft="home"/>
          <TextInput placeholder="Society address" iconLeft="map"/>
          <TextInput placeholder="City" iconLeft="map-pin"/>
          <TextInput placeholder="State" iconLeft="map-pin"/>
          <TextInput placeholder="Pincode " iconLeft="map-pin"/>
          <TextInput placeholder="Society description " iconLeft="file-text"/>


          <Button
            type="primary"
            style={{marginTop: 24}}
            // onPress={() => router.push("/")}
          >
            <Text base blue50>
              Register
            </Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding : 20,
  },

  titleContainer: {
    marginTop: 16,
    gap: 8,
  },

  wrapper: {
    marginTop: 24,
    gap: 8,
    borderRadius: 12,
    padding: 16
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