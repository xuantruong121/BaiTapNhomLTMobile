import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ScanButtonProps {
  onPress?: () => void;
}

const ScanButton: React.FC<ScanButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.scanButton}
      accessibilityLabel="Quét mã vạch"
      onPress={onPress}
    >
      <Ionicons name="barcode-outline" size={20} color="#C92127" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  scanButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});

export default ScanButton;