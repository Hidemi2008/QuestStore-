import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Header({ title, subtitle, onBack, style }) {
  return (
    <View style={[styles.header, style]}>
      {onBack && (
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.back}>{"< Voltar"}</Text>
        </TouchableOpacity>
      )}
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  back: {
    color: '#1e90ff',
    fontSize: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
  },
});