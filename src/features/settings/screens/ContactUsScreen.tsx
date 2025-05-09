import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContactUsScreen : React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>ContactUsScreen Component</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ContactUsScreen;
