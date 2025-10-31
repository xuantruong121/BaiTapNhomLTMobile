import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import CategoryModal from "../home/CategoryModal";

interface MenuButtonProps {
  onSelectCategory?: (category: string) => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ onSelectCategory }) => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const handlePress = () => {
    setShowCategoryModal(true);
  };

  const handleSelectCategory = (category: string) => {
    onSelectCategory?.(category);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        accessibilityLabel="Mở danh mục sách"
        onPress={handlePress}
      >
        <Ionicons name="grid-outline" size={24} color="white" />
      </TouchableOpacity>

      <CategoryModal
        visible={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        onSelectCategory={handleSelectCategory}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 36,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
});

export default MenuButton;
