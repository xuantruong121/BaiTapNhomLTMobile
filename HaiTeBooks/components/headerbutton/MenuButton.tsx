import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MenuButtonProps {
  onPress?: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      accessibilityLabel="Mở danh mục sách"
      onPress={onPress}
    >
      <Ionicons name="grid-outline" size={24} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
});

export default MenuButton;