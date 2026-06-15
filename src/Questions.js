import React, { useState } from "react";
import { ScrollView, Text, View, Image, StyleSheet, TouchableOpacity, Platform, Alert, SafeAreaView } from "react-native";
import * as SQLite from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import Header from "./components/Header";
import Card from "./components/Card";
import Fab from "./components/Fab";

const db = Platform.OS !== "web" ? SQLite.openDatabaseSync("provas.db") : null;

export default function Questions({ route, navigation }) {
  const { prova } = route.params;
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
      try {
        db.execSync(
          "CREATE TABLE IF NOT EXISTS questoes (id INTEGER PRIMARY KEY AUTOINCREMENT, prova_id INTEGER, title TEXT, description TEXT, image TEXT);"
        );
        const rows = db.getAllSync(
          "SELECT * FROM questoes WHERE prova_id = ?;",
          [prova.id]
        );
        setQuestoes(rows);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function deleteQuestao(id, index) {
    if (Platform.OS === "web") {
      try {
        const stored = await AsyncStorage.getItem("questoes");
        let questoes = stored ? JSON.parse(stored) : [];
        questoes = questoes.filter(q => q.id !== id);
        await AsyncStorage.setItem("questoes", JSON.stringify(questoes));
        setQuestoes(questoes.filter(q => q.prova_id === prova.id));
        Alert.alert("Sucesso", "Questão excluída!");
      } catch (error) {
        console.log(error);
        Alert.alert("Erro", "Não foi possível excluir a questão.");
      }
    } else {
      try {
        db.runSync("DELETE FROM questoes WHERE id = ?;", [id]);
        loadQuestoes();
        Alert.alert("Sucesso", "Questão excluída!");
      } catch (error) {
        console.log(error);
        Alert.alert("Erro", "Não foi possível excluir a questão.");
      }
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      loadQuestoes();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Header title={prova.title} onBack={() => navigation.goBack()} style={styles.header} />

        <Card style={styles.card}>
          {prova.image ? (
            <Image source={{ uri: prova.image }} style={styles.cardImage} />
          ) : null}
          <Text style={styles.cardTitle}>{prova.title}</Text>
          <Text style={styles.cardDescription}>
            {prova.description || "Sem descrição"}
          </Text>
        </Card>

        <Text style={styles.sectionTitle}>
          {questoes.length} {questoes.length === 1 ? "Questão" : "Questões"}
        </Text>

        {questoes.map((q, index) => (
          <Card key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{q.title}</Text>
            <Text style={styles.cardDescription}>
              {q.description || "Sem descrição"}
            </Text>
            {q.image ? (
              <Image source={{ uri: q.image }} style={styles.cardImage} />
            ) : null}

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteQuestao(q.id, index)}
            >
              <Text style={styles.deleteText}>Excluir</Text>
            </TouchableOpacity>
          </Card>
        ))}
      </ScrollView>

      <View style={styles.fabContainer}>
        <Fab onPress={() => navigation.navigate("NewQuestions", { prova })} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    paddingBottom: 80,
  },
  header: {
    marginTop: 20,
  },
  card: {
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#ccc',
  },
  cardImage: {
    marginTop: 10,
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e90ff',
    marginVertical: 10,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#ff4444',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
});