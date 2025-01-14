import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import FormButton from "@/components/form/FormButton";
import FormInput from "@/components/form/FormInput";
import FullScreen from "@/components/containers/FullScreen";

export default function register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("User registered successfully");
    } catch (error: any) {
      let errorMessage = "An error occurred";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email already in use";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak";
      }
      setMessage(errorMessage);
    }
  };

  return (
    <FullScreen>
      <FormInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <FormInput
        label="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <FormButton title="Registrar-se!" onPress={handleRegister} />

      {message ? <Text style={styles.errorMessage}>{message}</Text> : null}
    </FullScreen>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  errorMessage: {
    color: "red",
    fontSize: 20,
    marginTop: 20,
  },
});
