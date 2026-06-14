import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Button({ title, onPress, variant = "primary", style, textStyle }) {
  return (
    <TouchableOpacity
      style={[styles.base, variantStyles[variant], style]}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: '#1e90ff',
  },
  secondary: {
    backgroundColor: '#444',
  },
});