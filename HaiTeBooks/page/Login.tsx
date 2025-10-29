import { Ionicons } from "@expo/vector-icons";
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

type User = {
  username: string;
  password: string;
  email: string;
  full_name: string;
  address: string;
  role_id: "user" | "admin";
};

interface LoginProps {
  onLoginSuccess?: (user: User) => void;
  onRegisterPress?: () => void;
  onForgotPress?: () => void;
}

const Login: React.FC<LoginProps> = ({
  onLoginSuccess,
  onRegisterPress,
  onForgotPress,
}) => {
  const insets = useSafeAreaInsets();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isValid = username.trim().length > 0 && password.trim().length > 0;

  const handleLogin = () => {
    if (!isValid) return;

    const mockUser: User = {
      username,
      password,
      email: `${username}@example.com`,
      full_name: username,
      address: "",
      role_id: "user",
    };

    onLoginSuccess?.(mockUser);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.headerRed, { paddingTop: insets.top }]}>
        <Text style={styles.headerTitle}>Đăng nhập</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.inner}>
          <View style={styles.header}>
            <Text style={styles.subtitle}>
              Chào mừng bạn đến với HaiTeBooks
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Tên tài khoản</Text>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Nhập tên tài khoản của bạn"
              placeholderTextColor="#9CA3AF"
              keyboardType="default"
              autoCapitalize="none"
              style={styles.input}
            />
            <Text style={[styles.label, { marginTop: 14 }]}>Mật khẩu</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                style={styles.passwordInput}
              />
              <TouchableOpacity
                style={styles.eyeIconContainer}
                activeOpacity={0.7}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={18}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity activeOpacity={0.7} onPress={onForgotPress}>
                <Text style={styles.forgot}>Quên mật khẩu?</Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 12 }}></View>
            <TouchableOpacity
              style={[styles.loginBtn, !isValid && styles.loginBtnDisabled]}
              disabled={!isValid}
              activeOpacity={0.8}
              onPress={handleLogin}
            >
              <Text
                style={[styles.loginText, !isValid && styles.loginTextDisabled]}
              >
                Đăng nhập
              </Text>
            </TouchableOpacity>
            <View style={styles.orRow}>
              <View style={styles.divider} />
              <Text style={styles.orText}>Hoặc</Text>
              <View style={styles.divider} />
            </View>
            <View style={styles.socialRow}>
              <TouchableOpacity
                style={[styles.socialBtn, { backgroundColor: "#DB4437" }]}
                activeOpacity={0.8}
              >
                <View style={styles.socialContent}>
                  <Ionicons name="logo-google" size={18} color="#FFFFFF" />
                  <Text style={styles.socialText}>Google</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.socialBtn, { backgroundColor: "#1877F2" }]}
                activeOpacity={0.8}
              >
                <View style={styles.socialContent}>
                  <Ionicons name="logo-facebook" size={18} color="#FFFFFF" />
                  <Text style={styles.socialText}>Facebook</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Chưa có tài khoản?</Text>
              <TouchableOpacity activeOpacity={0.7} onPress={onRegisterPress}>
                <Text style={styles.linkText}>Đăng ký</Text>
              </TouchableOpacity>
            </View>
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
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  keyboardView: { flex: 1 },
  inner: { flex: 1, paddingHorizontal: 20 },
  header: { alignItems: "center", marginTop: 16, marginBottom: 16 },
  subtitle: { fontSize: 13, color: "#6B7280" },

  form: { marginTop: 16 },
  label: { fontSize: 13, color: "#374151", fontWeight: "600", marginBottom: 6 },
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
  passwordInputContainer: {
    position: "relative",
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingRight: 40,
    paddingVertical: Platform.select({ ios: 12, android: 10 }) as number,
    fontSize: 14,
    color: "#111827",
    backgroundColor: "#FFFFFF",
  },
  eyeIconContainer: {
    position: "absolute",
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },

  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginRight: 8,
  },
  checkboxText: { color: "#4B5563", fontSize: 12 },
  forgot: {
    color: "#C92127",
    fontSize: 12,
    fontWeight: "700",
    paddingTop: 10,
    paddingRight: 10,
  },

  loginBtn: {
    marginTop: 16,
    borderRadius: 10,
    backgroundColor: "#C92127",
    alignItems: "center",
    paddingVertical: 12,
  },
  loginBtnDisabled: { backgroundColor: "#F3F4F6" },
  loginText: { color: "#fff", fontWeight: "800", fontSize: 15 },
  loginTextDisabled: { color: "#9CA3AF" },

  orRow: { flexDirection: "row", alignItems: "center", marginVertical: 16 },
  divider: { flex: 1, height: 1, backgroundColor: "#E5E7EB" },
  orText: { marginHorizontal: 10, color: "#6B7280", fontSize: 12 },

  socialRow: { flexDirection: "row", gap: 12 },
  socialBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  socialContent: { flexDirection: "row", alignItems: "center", gap: 8 },
  socialText: { color: "#111827", fontWeight: "700" },

  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  footerText: { color: "#6B7280", marginRight: 6 },
  linkText: { color: "#C92127", fontWeight: "800" },
});

export default Login;
