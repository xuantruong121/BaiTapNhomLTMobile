import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CartTabProps {
  isActive?: boolean;
}

const CartTab: React.FC<CartTabProps> = ({ isActive = false }) => {
  const router = useRouter();
  const iconColor = isActive ? "#C92127" : "#999";
  const textColor = isActive ? "#C92127" : "#999";

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={() => router.push("/mobile/page/carts/Cart")}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={isActive ? "cart" : "cart-outline"}
          size={25}
          color={iconColor}
        />
      </View>
      <Text style={[styles.text, { color: textColor }]}>Giỏ hàng</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  iconContainer: {
    marginBottom: 0,
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
  },
});

export default CartTab;
