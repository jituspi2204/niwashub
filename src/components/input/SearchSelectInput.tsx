// components/SelectInput.tsx
import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext.tsx';
import Text from '../common/Text.tsx';
import View from '../common/View.tsx';
import { Header, TextInput } from '../index.ts';

export type Option = {
  label: string;
  value: string;
};

interface SelectInputProps {
  label?: string;
  options: Option[];
  placeholder?: string;
  selectedValue?: string;
  onSelect: (value: {label : string, value : string}) => void;
}

const SearchSelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  placeholder = 'Click to select',
  selectedValue,
  onSelect,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [availableOptions, setAvailableOptions] = useState<Option[]>(
    options || [],
  );
  const [activeValue, setActiveValue] = useState<string>('');
  const { colors } = useTheme();

  const handleSelect = (value: string, label: string) => {
    console.log('value is', value);
    setModalVisible(false);
    onSelect({label, value});
    setActiveValue(label);
  };
  const inputHandler = (label: any) => {
    console.log('label :', label);

    const newOptions = options.filter(opt =>
      opt.label.toLowerCase().includes(label.toLowerCase()),
    );
    setAvailableOptions(newOptions);
  };

  return (
    <View
      style={[
        styles.inputContainer,
        {
          borderColor: colors.n200,
          flexDirection: 'row',
          alignItems: 'center',
        },
      ]}>
      {label && (
        <Text base style={styles.label}>
          {label}
        </Text>
      )}

      <TouchableOpacity
        style={styles.input}
        onPress={() => setModalVisible(true)}>
        <Text base n600>
          {placeholder}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={[
            styles.modalBackground,
            { backgroundColor: 'rgba(0,0,0,0.5)' },
          ]}>
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: colors.subBackground },
            ]}>
            <Header
              type="secondary"
              title={'Select ' + label}
              onPress={() => setModalVisible(false)}
            />
            <TextInput
              placeholder={placeholder}
              type="search"
              onChangeText={value => inputHandler(value)}
            />
            <FlatList
              data={availableOptions}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.option, { borderColor: colors.n300 }]}
                  onPress={() => handleSelect(item.value, item.label)}>
                  <Text base>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SearchSelectInput;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    marginBottom: -1,
    paddingBottom: 30,
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    maxHeight: '60%',
  },
  inputContainer: {
    borderRadius: 12,
    borderWidth: 1.5,
  },
  label: {
    marginHorizontal: 16,
  },
  input: {
    fontSize: 16,
    fontFamily: 'Satoshi-Bold',
    minHeight: 56,
    borderRadius: 12,
    padding: 16,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  option: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
  },
  cancelBtn: {
    marginTop: 10,
    alignItems: 'center',
  },
});
