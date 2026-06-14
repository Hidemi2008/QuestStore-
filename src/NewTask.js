import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as SQLite from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./components/Header";
import Button from "./components/Button";
import Input from "./components/Input";

const db = Platform.OS !== "web" ? SQLite.openDatabaseSync("provas.db") : null;

export default function NewTask({ navigation }) {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (Platform.OS !== "web" && db) {
      try {
        db.execSync(
          "CREATE TABLE IF NOT EXISTS provas (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, image TEXT);"
        );
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  async function openCamera() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted) {
      const result = await ImagePicker.launchCameraAsync({ base64: true, quality: 0.7 });
      if (!result.canceled) {
        const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
        setImage(base64Image);
      }
    }
  }

  async function openGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({ base64: true, quality: 0.7 });
    if (!result.canceled) {
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setImage(base64Image);
    }
  }

  async function saveProva() {
    if (!title.trim()) {
      Alert.alert("Erro", "O campo Assunto é obrigatório.");
      return;
    }

    if (Platform.OS === "web") {
      try {
        const existing = await AsyncStorage.getItem("provas");
        const provas = existing ? JSON.parse(existing) : [];
        const newProva = {
          id: Date.now(),
          title,
          description,
          image,
        };
        provas.push(newProva);
        await AsyncStorage.setItem("provas", JSON.stringify(provas));
        Alert.alert("Sucesso", "Prova cadastrada (Web)!");
        navigation.goBack();
      } catch (error) {
        console.log(error);
        Alert.alert("Erro", "Não foi possível salvar a prova no Web.");
      }
    } else {
      try {
        db.runSync(
          "INSERT INTO provas (title, description, image) VALUES (?, ?, ?);",
          [title, description, image]
        );
        Alert.alert("Sucesso", "Prova cadastrada!");
        navigation.goBack();
      } catch (error) {
        console.log(error);
        Alert.alert("Erro", "Não foi possível salvar a prova.");
      }
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Header title="Nova Prova" subtitle="Cadastrar Nova Prova" onBack={() => navigation.goBack()} />

      <View style={styles.imageBox}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={{ color: "#888" }}>Nenhuma imagem selecionada</Text>
        )}
      </View>

      <View style={styles.buttons}>
        <Button title="📷 Câmera" onPress={openCamera} style={styles.halfButton} />
        <Button title="🖼 Galeria" onPress={openGallery} style={styles.halfButton} />
      </View>

      <Text style={styles.label}>Assunto</Text>
      <Input placeholder="Ex: Equação 2° Grau" value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Descrição (opcional)</Text>
      <Input placeholder="Detalhes ou observações sobre a prova..." multiline value={description} onChangeText={setDescription} />

      <Button title="Salvar Prova" onPress={saveProva} style={styles.saveButton} textStyle={styles.saveButtonText} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  imageBox: {
    height: 250,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  halfButton: {
    width: '48%',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
    marginTop: 10,
  },
  saveButton: {
    marginTop: 20,
    marginBottom: 20,
  },
  saveButtonText: {
    fontSize: 16,
  },
});