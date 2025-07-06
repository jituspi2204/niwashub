// components/SelectInput.tsx
import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext.tsx';
import Text from '../common/Text.tsx';
import View from '../common/View.tsx';
import { Header } from '../index.ts';

export type Option = {
  label: string;
  value: string;
};

interface SelectInputProps {
  label?: string;
  options: Option[];
  placeholder?: string;
  selectedValue?: string;
  onSelect: (value: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  placeholder = 'Select an option',
  selectedValue,
  onSelect,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { colors } = useTheme();

  const handleSelect = (value: string) => {
    setModalVisible(false);
    onSelect(value);
  };

  const selectedLabel =
    options.find(opt => opt.value === selectedValue)?.label || '';
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
          {selectedLabel || placeholder}
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
            <FlatList
              data={options}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.option, { borderColor: colors.n300 }]}
                  onPress={() => handleSelect(item.value)}>
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

export default SelectInput;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    marginBottom: -10,
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
