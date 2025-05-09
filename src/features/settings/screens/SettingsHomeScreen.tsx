import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import BudgetCategoryModal from '../../../components/modals/BudgetCategoryModal.tsx';
import mock from '../../../utils/mock.ts';
import { Text, View } from '../../../components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store.ts';
import DatePickerModal from '../../../components/modals/DatePickerModal.tsx';

const categories = [
  'Technology',
  'Health',
  'Sports',
  'Education',
  'Finance',
  'Travel',
  'Food',
  'Science',
];

const SettingsHomeScreen: React.FC = () => {
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
        onClose={() => setModalVisible(false)}
        categories={categories}
        onSelectCategory={handleSelectCategory}
      />

      {/*<DatePickerModal*/}
      {/*  visible={modalVisible}*/}
      {/*  onClose={() => setModalVisible(false)}*/}
      {/*  onSelectDate={date => {}}*/}
      {/*  initialDate={new Date(Date.now())}*/}
      {/*/>*/}

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text n700 h6>
          Categories
        </Text>
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

export default SettingsHomeScreen;
