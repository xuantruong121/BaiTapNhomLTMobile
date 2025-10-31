import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Method = "sms" | "zalo";

const RePass: React.FC = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [method, setMethod] = useState<Method>("sms");

  const isValid = identifier.trim().length > 0;

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/account");
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.headerRed, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Quên mật khẩu</Text>
          <View style={styles.backButtonPlaceholder} />
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.inner}>
          <View style={styles.form}>
            <Text style={styles.label}>Email / Số điện thoại</Text>
            <TextInput
              value={identifier}
              onChangeText={setIdentifier}
              placeholder="Nhập Email / Số điện thoại"
              placeholderTextColor="#9CA3AF"
              keyboardType="default"
              autoCapitalize="none"
              style={styles.input}
            />

            <Text style={[styles.label, { marginTop: 14 }]}>
              Chọn phương thức xác minh OTP
            </Text>
            <View style={styles.methodRow}>
              <TouchableOpacity
                style={[
                  styles.methodBtn,
                  method === "sms" && styles.methodBtnActive,
                ]}
                activeOpacity={0.7}
                onPress={() => setMethod("sms")}
              >
                <Ionicons
                  name="chatbubble-outline"
                  size={18}
                  color={method === "sms" ? "#3B82F6" : "#9CA3AF"}
                />
                <Text
                  style={[
                    styles.methodText,
                    method === "sms" && styles.methodTextActive,
                  ]}
                >
                  Tin nhắn SMS
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footerConfirm}>
            <TouchableOpacity
              style={[styles.confirmBtn, !isValid && styles.confirmBtnDisabled]}
              disabled={!isValid}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.confirmText,
                  !isValid && styles.confirmTextDisabled,
                ]}
              >
                Xác nhận
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerRed: {
    backgroundColor: "#C92127",
    paddingBottom: 12,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonPlaceholder: {
    width: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    flex: 1,
    textAlign: "center",
  },
  keyboardView: { flex: 1 },
  inner: { flex: 1, paddingHorizontal: 20, paddingTop: 16 },

  form: { marginTop: 4 },
  label: {
    fontSize: 13,
    color: "#374151",
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: Platform.select({ ios: 12, android: 10 }) as number,
    fontSize: 14,
    color: "#111827",
    backgroundColor: "#FFFFFF",
  },

  methodRow: { flexDirection: "row", gap: 12, marginTop: 8 },
  methodBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  methodBtnActive: { borderColor: "#3B82F6" },
  methodText: { fontSize: 14, color: "#6B7280" },
  methodTextActive: { color: "#3B82F6" },

  footerConfirm: { marginTop: "auto", paddingVertical: 16 },
  confirmBtn: {
    borderRadius: 10,
    backgroundColor: "#C92127",
    alignItems: "center",
    paddingVertical: 12,
  },
  confirmBtnDisabled: { backgroundColor: "#E5E7EB" },
  confirmText: { color: "#fff", fontWeight: "800", fontSize: 15 },
  confirmTextDisabled: { color: "#9CA3AF" },
});

export default RePass;
