import React, { useEffect, useState } from 'react';
import {
  Modal,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Button, Header, Icon, Text, TextInput, View } from '../index.ts';
import { BudgetCategory } from '../../types/categories.ts';
import { useTheme } from '../../theme/ThemeContext.tsx';
import BottomBar from '../BottomBar.tsx';

interface CategoryModalProps {
  visible: boolean;
  onClose: () => void;
  categories: BudgetCategory[];
  onSelectCategory: (category: string) => void;
}

type SelectedCategory = {
  value: BudgetCategory;
  isSelected: boolean;
};
const BudgetCategoryModal: React.FC<CategoryModalProps> = ({
  visible,
  onClose,
  categories,
  onSelectCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory[]>(
    [],
  );
  const { colors } = useTheme();
  useEffect(() => {
    let newSelectedCategories = categories.map(data => ({
      value: data,
      isSelected: false,
    }));
    setSelectedCategory(newSelectedCategories);
  }, [categories]);
  const [searchText, setSearchText] = useState('');

  const filteredCategories = selectedCategory.filter(category =>
    category.value.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const addSelectedCategoryHandler = (id: number) => {
    let newSelectedCategories = [...selectedCategory];
    newSelectedCategories.forEach(data => {
      if (data.value.id === id) {
        data.isSelected = !data.isSelected;
        return;
      }
    });
    setSelectedCategory(newSelectedCategories);
  };

  const renderItem = (category: SelectedCategory, idx: number) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => addSelectedCategoryHandler(category.value.id)}>
      <Icon
        name={category.value.icon}
        size={18}
        color={colors.n600}
        style={{ width: 30, marginRight: 10 }}
      />
      <Text base n600 style={{ flex: 1 }}>
        {category.value.name}
      </Text>
      <Icon
        name="tickSquare"
        size={24}
        color={category.isSelected ? colors.primary : colors.n300}
      />
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Header
            type="secondary"
            title="Select Budget Category"
            onPress={onClose}
          />
          <TextInput
            placeholder="Search categories..."
            type="search"
            value={searchText}
            onChangeText={setSearchText}
          />
          <Text caption n500 style={{ marginVertical: 10 }}>
            Choose the category that best suits your need
          </Text>
          <FlatList
            data={filteredCategories}
            keyExtractor={item => item.value.name}
            renderItem={({ item, index }) => renderItem(item, index)}
            contentContainerStyle={styles.listContainer}
          />
        </View>

        <BottomBar>
          <Button type="primary" onPress={onSelectCategory}>
            <Text base n50>
              Add income
            </Text>
          </Button>
        </BottomBar>
      </View>
    </Modal>
  );
};

export default BudgetCategoryModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    marginBottom: -10,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    height: '80%',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subHeading: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 10,
  },
  categoryItem: {
    paddingVertical: 15,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 'auto',
  },
  categoryText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007bff',
    borderRadius: 6,
  },
  closeText: {
    color: 'white',
    fontSize: 14,
  },
});
