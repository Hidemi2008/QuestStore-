import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Fab({ onPress, icon = "+" }) {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Text style={styles.fabText}>{icon}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: '#1e90ff',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  fabText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
});