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

export default function LoginScreen() {
  const [type, setType] = useState(1); // 1 = Sign in, 2 = Sign up
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !mail || !password) {
      return Alert.alert("Error", "Please fill in all fields");
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, mail, password);
      await updateProfile(userCredential.user, { displayName: name });
      Alert.alert("Success", "Registration complete! You can now log in.");
      setType(1); // Switch to Sign in
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
        <ActivityIndicator size="large" color="#2196F3" />
        <Text>Loading...</Text>
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
              style={styles.input}
            />
          )}

          <TextInput
            value={mail}
            onChangeText={setMail}
            placeholder="Enter your email"
            style={styles.input}
            keyboardType="email-address"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            style={styles.input}
            secureTextEntry
          />

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
  container: { flex: 1, justifyContent: "center", backgroundColor: "#fff" },
  innerContainer: { alignItems: "center", paddingHorizontal: 20 },
  headerText: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  switchButton: { marginTop: 15 },
  switchText: { color: "#2196F3" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
