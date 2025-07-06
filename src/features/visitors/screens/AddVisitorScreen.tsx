import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../../components';

const AddVisitorScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Add HomeScreen Component</Text>
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

export default AddVisitorScreen;
