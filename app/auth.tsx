// @ts-nocheck
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthScreen() {
  const [name, setName] = useState("andrewh");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    // Navigate to home after login
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.topSection}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome back Andrew!</Text>
          <Text style={styles.subText}>
            Log in to continue where you left off only with one click
          </Text>
        </View>
      </SafeAreaView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.bottomSection}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
           <View style={styles.formContainer}>
               {/* Name Input */}
              <View style={styles.inputGroup}>
                <View style={styles.inputWrapper}>
                  <Image
                    source={require("../assets/icon/mail-01.png")}
                    style={styles.inputIcon}
                    resizeMode="contain"
                  />
                  <View style={styles.verticalDivider} />
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
                    resizeMode="contain"
                  />
                  <View style={styles.verticalDivider} />
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

              {/* Spacer to push social buttons to bottom */}
              <View style={{ flex: 1, minHeight: 20 }} />

              {/* Or Sign up with */}
              <View style={styles.dividerContainer}>
                <Text style={styles.dividerText}>Or Sign up with</Text>
              </View>

              {/* Social Buttons */}
              <TouchableOpacity style={styles.socialButton}>
                <Image
                  source={require("../assets/icon/google.png")}
                  style={styles.socialIcon}
                  resizeMode="contain"
                />
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <Image
                  source={require("../assets/icon/facebook.png")}
                  style={styles.socialIcon}
                  resizeMode="contain"
                />
                <Text style={styles.socialButtonText}>Facebook</Text>
              </TouchableOpacity>
           </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#245550", // Dark Teal Background
    paddingHorizontal:20,
    paddingVertical:20
  },
  topSection: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
    textAlign: "left",
  },
  subText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    textAlign: "left",
    lineHeight: 20,
    maxWidth: "80%",
  },
  bottomSection: {
    flex: 1,
    backgroundColor: "#FFFCEA", // Cream/White color
    borderRadius:32,
    overflow: "hidden",
    display:"flex",
    justifyContent:"space-between",

  },
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    padding: 24,
    paddingTop: 40,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: "#E2E8F0", // Light gray border
    borderRadius: 28, // Pill shape
    backgroundColor: "#FFF",
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  verticalDivider: {
    width: 1,
    height: 24,
    backgroundColor: "#E2E8F0",
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#334155",
    fontWeight: "500",
  },
  eyeIcon: {
    padding: 8,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
    marginTop: 4,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#94A3B8",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#245550",
    borderColor: "#245550",
  },
  checkmark: {
    color: "#fff",
    fontSize: 12,
    marginTop: -2,
    fontWeight: "bold",
  },
  rememberMeText: {
    fontSize: 13,
    color: "#475569",
    fontWeight: "500",
  },
  forgotPassword: {
    fontSize: 13,
    color: "#245550", // Dark Teal
    fontWeight: "700",
  },
  loginButton: {
    backgroundColor: "#245550",
    borderRadius: 28,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    shadowColor: "#245550",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  dividerContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  dividerText: {
    fontSize: 13,
    color: "#94A3B8",
    fontWeight: "500",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 16,
    backgroundColor: "#FFF",
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
  },
});
