import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Ionicons } from "@expo/vector-icons"; // Для иконки "глаз"

export default function LoginScreen() {
  const [type, setType] = useState(1); // 1 = Sign in, 2 = Sign up
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Для переключения видимости пароля

  const handleSignUp = async () => {
    if (!name || !mail || !password) {
      return Alert.alert("Error", "Please fill in all fields");
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, mail, password);
      await updateProfile(userCredential.user, { displayName: name });
      Alert.alert("Success", "Registration complete! You can now log in.");
      setType(1); // Переключение на вход
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!mail || !password) {
      return Alert.alert("Error", "Please fill in all fields");
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, mail, password);
      Alert.alert("Success", "You are now logged in!");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffc107" />
        <Text style={{ color: "#fff" }}>Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Text style={styles.headerText}>{type === 1 ? "Sign In" : "Sign Up"}</Text>

          {type === 2 && (
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor="#9aa5b1"
              style={styles.input}
            />
          )}

          <TextInput
            value={mail}
            onChangeText={setMail}
            placeholder="Enter your email"
            placeholderTextColor="#9aa5b1"
            style={styles.input}
            keyboardType="email-address"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor="#9aa5b1"
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="#ffc107"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={type === 1 ? handleSignIn : handleSignUp}
          >
            <Text style={styles.buttonText}>{type === 1 ? "Log In" : "Register"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setType(type === 1 ? 2 : 1)}
            style={styles.switchButton}
          >
            <Text style={styles.switchText}>
              {type === 1 ? "Don't have an account? Sign up" : "Already have an account? Log in"}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", backgroundColor: "#0d1b2a" },
  innerContainer: { alignItems: "center", paddingHorizontal: 20 },
  headerText: { fontSize: 24, fontWeight: "bold", color: "#ffc107", marginBottom: 20 },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ffc107",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    color: "#fff",
    backgroundColor: "#1b263b",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ffc107",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#1b263b",
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    color: "#fff",
    paddingVertical: 12,
  },
  button: {
    backgroundColor: "#ffc107",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: "#0d1b2a", fontSize: 16, fontWeight: "bold" },
  switchButton: { marginTop: 15 },
  switchText: { color: "#ffc107" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0d1b2a" },
});
