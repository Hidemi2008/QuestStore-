import { TextInput, StyleSheet } from "react-native";

export default function Input({ multiline = false, style, ...props }) {
  return (
    <TextInput
      placeholderTextColor="#999"
      style={[multiline ? styles.multiline : styles.input, style]}
      multiline={multiline}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#111',
    color: '#fff',
    padding: 15,
    borderRadius: 8,
  },
  multiline: {
    backgroundColor: '#111',
    color: '#fff',
    padding: 15,
    borderRadius: 8,
    height: 120,
    textAlignVertical: 'top',
  },
});