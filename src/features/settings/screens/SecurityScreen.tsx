import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SecurityScreen : React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>SecurityScreen Component</Text>
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

export default SecurityScreen;
