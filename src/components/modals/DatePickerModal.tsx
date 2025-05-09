import React, { useState } from 'react';
import { Modal, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text, View } from '../index.ts';
import { useTheme } from '../../theme/ThemeContext.tsx';

interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectDate: (date: Date) => void;
  initialDate?: Date;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  visible,
  onClose,
  onSelectDate,
  initialDate = new Date(),
}) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const { colors } = useTheme();

  const handleChange = (_: any, date?: Date) => {
    if (Platform.OS === 'android') {
      onClose(); // Dismiss modal on Android
    }
    if (date) {
      setSelectedDate(date);
      onSelectDate(date);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View
        style={[
          styles.modalBackground,
          { backgroundColor: colors.background },
        ]}>
        <View style={styles.modalContainer}>
          {Platform.OS === 'ios' && (
            <>
              <DateTimePicker
                mode="date"
                display="spinner"
                value={selectedDate}
                onChange={handleChange}
                style={styles.datePicker}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  onSelectDate(selectedDate);
                  onClose();
                }}>
                <Text base n600>
                  Done
                </Text>
              </TouchableOpacity>
            </>
          )}
          {Platform.OS === 'android' && (
            <DateTimePicker
              mode="date"
              display="default"
              value={selectedDate}
              onChange={handleChange}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default DatePickerModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    padding: 20,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    flex: 1,
  },
  datePicker: {
    width: '100%',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
