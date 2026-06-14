import React, { useState } from "react";
import { ScrollView, Text, View, Image, StyleSheet, TouchableOpacity, Platform } from "react-native";
import * as SQLite from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const db = Platform.OS !== "web" ? SQLite.openDatabase("provas.db") : null;

export default function Questions({ route, navigation }) {
  const { prova } = route.params; // recebe os dados da prova
  const [questoes, setQuestoes] = useState([]);

  async function loadQuestoes() {
    if (Platform.OS === "web") {
      try {
        const stored = await AsyncStorage.getItem("questoes");
        const parsed = stored ? JSON.parse(stored) : [];
        setQuestoes(parsed.filter(q => q.prova_id === prova.id));
      } catch (error) {
        console.log(error);
      }
    } else {
      db.transaction(tx => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS questoes (id INTEGER PRIMARY KEY AUTOINCREMENT, prova_id INTEGER, title TEXT, description TEXT, image TEXT);"
        );
        tx.executeSql(
          "SELECT * FROM questoes WHERE prova_id = ?;",
          [prova.id],
          (_, { rows }) => {
            setQuestoes(rows._array);
          },
          (_, error) => {
            console.log(error);
          }
        );
      });
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      loadQuestoes();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho da prova */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>{"< Voltar"}</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>{prova.title}</Text>
          <Text style={styles.subtitle}>Matéria: Matemática</Text>
        </View>
      </View>

      <View style={styles.card}>
        {prova.image ? (
          <Image source={{ uri: prova.image }} style={styles.cardImage} />
        ) : null}
        <Text style={styles.cardTitle}>{prova.title}</Text>
        <Text style={styles.cardDescription}>
          {prova.description || "Sem descrição"}
        </Text>
      </View>

      {/* Lista de questões */}
      <Text style={styles.sectionTitle}>
        {questoes.length} {questoes.length === 1 ? "Questão" : "Questões"}
      </Text>

      {questoes.map((q, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{q.title}</Text>
          <Text style={styles.cardDescription}>
            {q.description || "Sem descrição"}
          </Text>
          {q.image ? (
            <Image source={{ uri: q.image }} style={styles.cardImage} />
          ) : null}
        </View>
      ))}

      {/* Botão para adicionar nova questão */}
      <View style={styles.fabContainer}>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate("NewQuestions", { prova })}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  header: { marginBottom: 20, flexDirection: "row", alignItems: "center", gap: 15 },
  backText: { color: "#1e90ff", fontSize: 18 },
  title: { fontSize: 26, fontWeight: "bold", color: "#fff" },
  subtitle: { fontSize: 16, color: "#ccc", marginTop: 5 },
  card: {
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#fff", marginBottom: 5 },
  cardDescription: { fontSize: 14, color: "#ccc" },
  cardImage: { marginTop: 10, width: "100%", height: 150, borderRadius: 8 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#1e90ff", marginVertical: 10 },
  fabContainer: { position: "absolute", bottom: 20, right: 20 },
  fab: {
    backgroundColor: "#1e90ff",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  fabText: { fontSize: 28, color: "#fff", fontWeight: "bold" },
});
