import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function App() {
  return (
    <View style={styles.container}>

      <Ionicons name="school-outline" size={48} color="#fff" style={styles.icon} />

      <Text style={styles.title}>
        Banco de Questões
      </Text>

      <Text style={styles.subtitle}>
        Organize e reutilize suas provas e questões com facilidade.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardNumber}>4</Text>
        <Text style={styles.cardText}>Provas Cadastradas</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonPrimary}>
          <Text style={styles.buttonText}>Nova Prova</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary}>
          <Text style={styles.buttonText}>Ver Provas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  cardNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardText: {
    fontSize: 16,
    color: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  buttonPrimary: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonSecondary: {
    backgroundColor: '#444',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
