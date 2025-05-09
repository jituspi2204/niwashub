import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BudgetCategoryModal from '../../../components/modals/BudgetCategoryModal.tsx';
import mock from '../../../utils/mock.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
const BudgetHomeScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = useSelector(
    (state: RootState) => state.bootstrapData.budgetCategories,
  );

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <BudgetCategoryModal
        visible={modalVisible}
        onClose={setModalVisible(false)}
        categories={categories}
        onSelectCategory={handleSelectCategory}
      />
      <TouchableOpacity onPress={setModalVisible(true)}>
        <Text> Categories</Text>
      </TouchableOpacity>
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

export default BudgetHomeScreen;
