import { View, Text, StyleSheet } from "react-native";

export default function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function StatCard({ number, label }) {
  return (
    <Card style={styles.statCard}>
      <Text style={styles.statNumber}>{number}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Card>
  );
}

export function ProvaCard({ title, subject, grade }) {
  return (
    <Card>
      <Text style={styles.provaTitle}>{title}</Text>
      <Text style={styles.provaText}>{subject}</Text>
      <Text style={styles.provaText}>{grade}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  statCard: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 16,
    color: '#ccc',
  },
  provaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  provaText: {
    fontSize: 14,
    color: '#ccc',
  },
});