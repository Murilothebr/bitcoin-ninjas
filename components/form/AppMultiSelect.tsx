import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Colors } from "@/consts/colors";
import { Spacing } from "@/consts/spacing";

type Option = {
  label: string;
  value: string;
};

type AppMultiSelectProps = {
  label?: string;
  options: Option[];
  selectedValues: string[];
  onValueChange: (value: string[]) => void;
  error?: string;
};

export default function AppMultiSelect({
  label,
  options,
  selectedValues,
  onValueChange,
  error,
}: AppMultiSelectProps) {
  const handleSelection = (value: string) => {
    if (selectedValues.includes(value)) {
      onValueChange(selectedValues.filter((item) => item !== value));
    } else {
      onValueChange([...selectedValues, value]);
    }
  };

  return (
    <View style={[styles.container]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.selectBox, error ? styles.selectBoxError : null]}>
        <FlatList
          data={options}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.option,
                selectedValues.includes(item.value) && styles.optionSelected,
              ]}
              onPress={() => handleSelection(item.value)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedValues.includes(item.value) &&
                    styles.optionTextSelected,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: Spacing.md,
    width: "80%",
  },
  label: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  selectBox: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: "white",
  },
  selectBoxError: {
    borderColor: "red",
  },
  option: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "#FFF",
  },
  optionSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  optionText: {
    fontSize: 14,
    color: "gray",
  },
  optionTextSelected: {
    color: "white",
    fontWeight: "600",
  },
  error: {
    fontSize: 12,
    color: "red",
    marginTop: 5,
  },
});
