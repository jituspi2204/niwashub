import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext.tsx';
import { Text } from '../index.ts';

type OverlayLoaderProps = {
  loading: boolean;
  children: React.ReactNode;
  loaderColor?: string;
  loaderSize?: 'small' | 'large';
  overlayBackgroundColor?: string;
  message?: string;
};

const OverlayLoader: React.FC<OverlayLoaderProps> = ({
  loading,
  message,
  children,
  loaderSize = 'large',
  overlayBackgroundColor = 'rgba(0,0,0,0.5)',
}) => {

  const {colors} = useTheme();
  return (
    <>
      {children}
      {loading && (
        <Modal visible transparent animationType="fade">
          <View
            style={[
              styles.overlay,
              { backgroundColor: overlayBackgroundColor },
            ]}>
            <View style={[styles.spinnerCard, {backgroundColor : colors.subBackground}]}>
              <ActivityIndicator size={loaderSize} color={colors.primary} />
              <Text base2>{message || 'loading, please wait'}</Text>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerCard : {
      width : 280,
    height : 100,
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center'
  }
});

export default OverlayLoader;
