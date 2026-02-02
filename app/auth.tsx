import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function AuthScreen() {
  const [name, setName] = useState("andrew");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    // Navigate to home after login
    router.replace("/(tabs)");
  };

  return (
    <LinearGradient colors={["#245550", "#245550"]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <SafeAreaView>
            <View style={styles.header}>
              <Text style={styles.welcomeText}>Welcome back Andrew!</Text>
              <Text style={styles.subText}>
                Log in to continue where you left off only with one click
              </Text>
            </View>

            <View style={styles.formContainer}>
              {/* Name Input */}
              <View style={styles.inputGroup}>
                <View style={styles.inputWrapper}>
                  <Image
                    source={require("../assets/icon/mail-01.png")}
                    style={styles.inputIcon}
                  />
                  <View
                    style={{
                      width: 1,
                      height: "70%",
                      backgroundColor: "#D9D9D9",
                    }}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor="#999"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <View style={styles.inputWrapper}>
                  <Image
                    source={require("../assets/icon/lock-password.png")}
                    style={styles.inputIcon}
                  />
                  <View
                    style={{
                      width: 1,
                      height: "70%",
                      backgroundColor: "#D9D9D9",
                    }}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                  >
                    <MaterialCommunityIcons
                      name={showPassword ? "eye" : "eye-off"}
                      size={20}
                      color="#999"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Remember Me & Forgot Password */}
              <View style={styles.bottomRow}>
                <TouchableOpacity
                  style={styles.rememberMeContainer}
                  onPress={() => setRememberMe(!rememberMe)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      rememberMe && styles.checkboxChecked,
                    ]}
                  >
                    {rememberMe && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.rememberMeText}>Remember me</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>Log in</Text>
              </TouchableOpacity>

              {/* Or Sign up with */}
              <View style={styles.dividerContainer}>
                <Text style={styles.dividerText}>Or Sign up with</Text>
              </View>

              {/* Google Button */}
              <TouchableOpacity style={styles.socialButton}>
                <Image
                  source={require("../assets/icon/google.png")}
                  style={styles.socialIcon}
                />
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>

              {/* Facebook Button */}
              <TouchableOpacity style={styles.socialButton}>
                <Image
                  source={require("../assets/icon/facebook.png")}
                  style={styles.socialIcon}
                />
                <Text style={styles.socialButtonText}>Facebook</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#245550",
  },
  keyboardAvoid: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  socialIcon: {
    fontWeight: "700",
    height: 20,
    width: 20,
  },
  checkmark: {
    color: "#fff",
    fontSize: 12,
    marginTop: -2,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: "center",
  },
  header: {
    marginBottom: 40,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 12,
    textAlign: "center",
  },
  subText: {
    fontSize: 14,
    color: "#ddd",
    textAlign: "center",
    lineHeight: 20,
  },
  formContainer: {
    backgroundColor: "#FFFCEA",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
  },
  eyeIcon: {
    padding: 8,
    marginLeft: 8,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 8,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: "#ddd",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#245550",
    borderColor: "#245550",
  },
  rememberMeText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  forgotPassword: {
    fontSize: 12,
    color: "#245550",
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#245550",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  dividerContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  dividerText: {
    fontSize: 12,
    color: "#999",
    fontWeight: "500",
  },
  socialButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
    justifyContent: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#D9D9D9",
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  googleIcon: {
    fontWeight: "700",
    marginRight: 8,
  },
  facebookIcon: {
    fontWeight: "700",
    marginRight: 8,
    color: "#1877F2",
  },
});
