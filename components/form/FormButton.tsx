import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type FormInput = {
  title: string;
} & TouchableOpacityProps;

export default function FormButton({ title, ...rest }: FormInput) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
  },
  title: {
    color: "gray",
    textAlign: "center",
    fontSize: 20,
  },
  buttonImage: {
    width: 200,
    height: 50,
  },
});
