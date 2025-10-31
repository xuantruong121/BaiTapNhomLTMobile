import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface LogoutButtonProps {
  onPress: () => void;
  label?: string;
  loading?: boolean;
  style?: ViewStyle;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
  onPress,
  label = "Đăng xuất",
  loading = false,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.logoutButton, style]}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.logoutText}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    width: "50%",
    alignSelf: "center",
    backgroundColor: "#C92127",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
});

export default LogoutButton;
