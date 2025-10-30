import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type OTPMethod = "sms" | "zalo";

interface RegisterProps {
  onBackToLogin?: () => void;
}

const Register: React.FC<RegisterProps> = ({ onBackToLogin }) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpMethod, setOtpMethod] = useState<OTPMethod>("sms");

  const isValid = phone.trim().length > 0 && password.trim().length > 0;

  const handleRegister = () => {
    if (!isValid) return;
    console.log("Register:", { phone, password, otpMethod });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Text style={styles.headerTitle}>Đăng ký</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.form}>
            <Text style={styles.label}>Số điện thoại</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="Nhập số điện thoại"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              style={styles.input}
            />

            <Text style={[styles.label, { marginTop: 14 }]}>Mật khẩu</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Nhập mật khẩu"
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

            <Text style={[styles.label, { marginTop: 14 }]}>
              Chọn phương thức xác minh OTP
            </Text>

            <TouchableOpacity
              style={[
                styles.registerBtn,
                !isValid && styles.registerBtnDisabled,
              ]}
              disabled={!isValid}
              activeOpacity={0.8}
              onPress={handleRegister}
            >
              <Text
                style={[
                  styles.registerText,
                  !isValid && styles.registerTextDisabled,
                ]}
              >
                Đăng Ký
              </Text>
            </TouchableOpacity>

            <View style={styles.loginPrompt}>
              <Text style={styles.loginPromptText}>Bạn đã có tài khoản? </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  onBackToLogin ? onBackToLogin() : router.push("/account")
                }
              >
                <Text style={styles.loginLink}>Đăng nhập ngay</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                Bằng việc đăng ký, bạn đã đồng ý với HaiTeBooks.com về{" "}
                <Text
                  style={styles.termsLink}
                  onPress={() => router.push("" as any)} //Thêm link vào ""
                >
                  Điều khoản sử dụng
                </Text>{" "}
                &{" "}
                <Text
                  style={styles.termsLink}
                  onPress={() => router.push("" as any)} //Thêm link vào ""
                >
                  Chính sách bảo mật
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.footerLeft}
            onPress={() => router.push("" as any)} //Thêm link vào ""
          >
            <Ionicons name="help-circle-outline" size={16} color="#111827" />
            <Text style={styles.helpText}>Trung tâm trợ giúp</Text>
          </TouchableOpacity>
          <View style={styles.footerRight}>
            <TouchableOpacity style={styles.flagButton} activeOpacity={0.7}>
              <Text style={styles.flagEmoji}>🇻🇳</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flagButton} activeOpacity={0.7}>
              <Text style={styles.flagEmoji}>🇬🇧</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
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
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
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
  otpMethodRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  otpMethodOption: {
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
  otpMethodOptionActive: {
    borderColor: "#3B82F6",
  },
  otpMethodText: {
    fontSize: 14,
    color: "#6B7280",
  },
  otpMethodTextActive: {
    color: "#3B82F6",
  },
  zaloIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#9CA3AF",
    alignItems: "center",
    justifyContent: "center",
  },
  zaloIconActive: {
    backgroundColor: "#3B82F6",
  },
  zaloIconText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },
  registerBtn: {
    marginTop: 24,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    paddingVertical: 12,
  },
  registerBtnDisabled: {
    backgroundColor: "#F3F4F6",
  },
  registerText: {
    color: "#6B7280",
    fontWeight: "800",
    fontSize: 15,
  },
  registerTextDisabled: {
    color: "#9CA3AF",
  },
  loginPrompt: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  loginPromptText: {
    color: "#6B7280",
    fontSize: 14,
  },
  loginLink: {
    color: "#FF6B35",
    fontSize: 14,
    fontWeight: "700",
  },
  termsContainer: {
    marginTop: 16,
    paddingHorizontal: 8,
  },
  termsText: {
    fontSize: 12,
    color: "#6B7280",
    lineHeight: 18,
    textAlign: "center",
  },
  termsLink: {
    color: "#3B82F6",
    fontSize: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: Platform.select({ ios: 20, android: 16 }) as number,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  footerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  helpText: {
    fontSize: 12,
    color: "#111827",
  },
  footerRight: {
    flexDirection: "row",
    gap: 8,
  },
  flagButton: {
    padding: 4,
  },
  flagEmoji: {
    fontSize: 24,
  },
});

export default Register;
