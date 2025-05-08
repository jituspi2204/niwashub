import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { Button, Text, TextInput, View } from '../../../components';
import { useTheme } from '../../../theme/ThemeContext.tsx';
import BottomBar from '../../../components/BottomBar.tsx';

const AddIncomeScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  return (
    <View
      safe
      style={[
        styles.container,
        {
          backgroundColor: colors.n100,
        },
      ]}>
      <ScrollView>
        <View
          style={[
            styles.wrapper,
            {
              backgroundColor: colors.n50,
            },
          ]}>
          <TextInput
            type="single"
            placeholder="Name"
            keyboardType="default"
            // value={name}
            // onChangeText={setName}
          />
          <TextInput
            type="single"
            placeholder="$0.00"
            keyboardType="numeric"
            // value={amount}
            // onChangeText={setAmount}
          />

          <TextInput
            type="button"
            // title={formatDate(date)}
            keyboardType="numeric"
            // onPress={showPicker}
          />
        </View>

        {/*{pickerShow && (*/}
        {/*    <Modal*/}
        {/*        transparent={true}*/}
        {/*        isVisible={pickerShow}*/}
        {/*        style={{*/}
        {/*          flex: 1,*/}
        {/*          justifyContent: "flex-end",*/}
        {/*          paddingBottom: 24,*/}
        {/*        }}*/}
        {/*    >*/}
        {/*      <DatePicker*/}
        {/*          value={date}*/}
        {/*          onChange={onChange}*/}
        {/*          onPress={() => setPickerShow(false)}*/}
        {/*      />*/}

        {/*      <Button*/}
        {/*          type="secondary"*/}
        {/*          onPress={() => setPickerShow(false)}*/}
        {/*          style={{*/}
        {/*            marginTop: 8,*/}
        {/*          }}*/}
        {/*      >*/}
        {/*        <Text base blue500>*/}
        {/*          Cancel*/}
        {/*        </Text>*/}
        {/*      </Button>*/}
        {/*    </Modal>*/}
        {/*)}*/}
      </ScrollView>

      <BottomBar>
        <Button type="primary" disabled={loading}>
          {loading ? (
            <View style={[styles.loading]}>
              <ActivityIndicator size="small" color={colors.n50} />
              <Text base n50>
                Adding income...
              </Text>
            </View>
          ) : (
            <Text base n50>
              Add income
            </Text>
          )}
        </Button>
      </BottomBar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    marginTop: 24,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },

  loading: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddIncomeScreen;
