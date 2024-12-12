import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { useState } from "react";
import { Colors } from "@/consts/colors";
import { Spacing } from "@/consts/spacing";

type FormInputProps = {
  label?: string;
  error?: string; // Add error prop
} & TextInputProps;

export default function FormInput({ label, error, ...rest }: FormInputProps) {
  const [focus, setFocus] = useState(false);

  return (
    <View style={[styles.container, focus && styles.focusContainer]}>
      {label && (
        <Text style={[styles.label, focus && styles.focus]}>{label}</Text>
      )}
      <TextInput
        {...rest}
        style={[
          styles.input,
          focus && styles.inputFocus,
          error && styles.inputError,
        ]}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      {error && <Text style={styles.error}>{error}</Text>} 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.mt,
    padding: 8,
    width: "80%",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    color: "gray",
  },
  focus: {
    color: Colors.primary,
  },
  focusContainer: {
    borderBottomColor: Colors.primary,
  },
  input: {
    fontSize: 16,
    paddingVertical: 5,
    color: "black",
  },
  inputFocus: {
    borderBottomColor: Colors.primary,
  },
  inputError: {
    borderBottomColor: "red",
  },
  error: {
    fontSize: 12,
    color: "red",
    marginTop: 5,
  },
});
