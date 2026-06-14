import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function Prova({ navigation }) {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");

  async function openCamera() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (permission.granted) {
      const result = await ImagePicker.launchCameraAsync();

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  }

  async function openGallery() {
    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: "#1e90ff", fontSize: 18 }}>
            {"< Voltar"}
          </Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>Nova Prova</Text>
          <Text style={styles.subtitle}>Cadastrar Nova Prova</Text>
        </View>
      </View>

      <View style={styles.imageBox}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={{ color: "#888" }}>
            Nenhuma imagem selecionada
          </Text>
        )}
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <Text style={styles.buttonText}>📷 Câmera</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={openGallery}>
          <Text style={styles.buttonText}>🖼 Galeria</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Assunto</Text>

      <TextInput
        placeholder="Ex: Equação 2° Grau"
        placeholderTextColor="#999"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Descrição (opcional)</Text>

      <TextInput
        placeholder="Detalhes ou observações sobre a prova..."
        placeholderTextColor="#999"
        style={styles.descriptionInput}
        multiline
      />

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Salvar Questão</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },

  header: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "#ccc",
  },

  imageBox: {
    height: 250,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#1e90ff",
    padding: 12,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#111",
    color: "#fff",
    padding: 15,
    borderRadius: 8,
  },

  descriptionInput: {
    backgroundColor: "#111",
    color: "#fff",
    padding: 15,
    borderRadius: 8,
    height: 120,
    textAlignVertical: "top",
  },

  saveButton: {
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});