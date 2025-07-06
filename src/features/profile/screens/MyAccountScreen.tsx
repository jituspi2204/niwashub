import React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { Text, TextInput, View } from '../../../components';
import { useTheme } from '../../../theme/ThemeContext.tsx';
import { avatars } from '../../../utils/images.ts';

const MyAccountScreen: React.FC = () => {
  const { colors } = useTheme();
  return (
    <View
      safe
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}>
      <ScrollView>
        <View style={[styles.titleContainer]}>
          <View
            style={[
              styles.avatarContainer,
              {
                borderColor: colors.subBackground,
              },
            ]}>
            <Image source={avatars.indianMan} style={styles.avatar} />
          </View>

          <Text h6 n700>
            Eleyas Hasan
          </Text>
          <Text base2 n400>
            +1 (352) 844 0270
          </Text>
        </View>

        <View
          style={[
            styles.wrapper,
            {
              backgroundColor: colors.n50,
            },
          ]}>
          <TextInput type="single" placeholder="name" />
          <TextInput type="single" placeholder="email" />
          <TextInput type="single" placeholder="password" />
        </View>
      </ScrollView>

      {/*<Toast*/}
      {/*  visible={true}*/}
      {/*  message="Success! You've changed your information."*/}
      {/*/>*/}

      {/*<BottomBar>*/}
      {/*  <Button type="primary" onPress={onSavePress} disabled={loading}>*/}
      {/*    {loading ? (*/}
      {/*      <View style={[styles.loading]}>*/}
      {/*        <ActivityIndicator size="small" color={colors.n100} />*/}
      {/*        <Text base n50>*/}
      {/*          Updating information...*/}
      {/*        </Text>*/}
      {/*      </View>*/}
      {/*    ) : (*/}
      {/*      <Text base n50>*/}
      {/*        Update information*/}
      {/*      </Text>*/}
      {/*    )}*/}
      {/*  </Button>*/}
      {/*</BottomBar>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titleContainer: {
    marginTop: 24,
    gap: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  wrapper: {
    marginTop: 24,
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },

  avatarContainer: {
    width: 72,
    height: 72,
    borderRadius: 40,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBE7CB',
    borderWidth: 1.5,
  },

  avatar: {
    width: 44,
    height: 44,
    objectFit: 'cover',
  },

  loading: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyAccountScreen;
