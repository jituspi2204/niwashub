import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '../../../theme/ThemeContext.tsx';
import {Button, Icon, Text, TextInput, View} from '../../../components';
import {useNavigation} from '@react-navigation/native';




const LoginScreen: React.FC = () => {
  const {colors} = useTheme();
  const router = useNavigation();
  return (
      <SafeAreaView
          style={[
              styles.container,
              {
                  backgroundColor: colors.n100,
              },
          ]}
      >
          <ScrollView>
              <View style={[styles.titleContainer]}>
                  <Text h5 n700>
                      Sign in {"\n"}to your account
                  </Text>
                  <Text caption n400>
                      Enter your credentials to access your financial information and
                      manage your money with ease.
                  </Text>
              </View>

              <View
                  style={[
                      styles.wrapper,
                      {
                          backgroundColor: colors.n50,
                      },
                  ]}
              >

                  <TextInput type="phone" />
                  <Button
                    type="primary"
                    style={{ marginVertical: 24 }}
                  >
                    <Text base blue50>
                      Send OTP
                    </Text>
                  </Button>

               <View style={styles.section}>
                 <View style={[styles.line, {backgroundColor : colors.n400}]} />
                 <Text
                   caption
                   n400
                   style={{marginHorizontal : 10}}
                 >
                   Or use social accounts
                 </Text>
                 <View style={[styles.line, {backgroundColor : colors.n400}]} />

               </View>

                <View style={[styles.socialButtons]}>

                  <Button type="secondary" style={styles.socialButton}>
                    <Icon name="google" size={24} />
                    <Text base n700>
                      Google
                    </Text>
                  </Button>
                </View>
                <View style={[styles.section, {justifyContent:  "center", marginTop : 24}]}>
                  <Text
                    caption
                    n400
                  >
                    Don't have an account ?{" "}
                  </Text>
                  <TouchableOpacity >
                    <Text captionMedium blue500 >
                      Register
                    </Text>
                  </TouchableOpacity>
                </View>

              </View>
              </ScrollView>

          </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    titleContainer: {
        paddingHorizontal: 16,
        marginTop: 64,
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
    line : {
        flex : 1,
        height: 1,
    },
    section:{
      flex : 1,
      flexDirection : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
});
export default LoginScreen;
