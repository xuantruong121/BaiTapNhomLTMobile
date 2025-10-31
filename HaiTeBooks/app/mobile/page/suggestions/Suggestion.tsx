import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Suggestion: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gợi ý</Text>
      </View>

      <View style={styles.content}>
        <Ionicons name="star" size={64} color="#C92127" />
        <Text style={styles.title}>Trang Gợi ý</Text>
        <Text style={styles.subtitle}>Đây là trang gợi ý sản phẩm cho bạn</Text>
        <Text style={styles.description}>
          Nội dung trang này sẽ hiển thị các sản phẩm được đề xuất dựa trên sở
          thích và lịch sử mua hàng của bạn.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "#C92127",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 20,
    marginTop: 8,
  },
});

export default Suggestion;
