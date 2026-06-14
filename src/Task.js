import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

export default function Task(){
    return(
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.title}>Provas</Text>
                <Text style={styles.subtitle}>4 Provas Cadastradas</Text>
            </View>

            <View style={styles.list}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Prova Bimestral - Funções</Text>
                    <Text style={styles.cardSubject}>Matemática</Text>
                    <Text style={styles.cardGrade}>9º Ano</Text>
                </View>
            </View>

            <View style={styles.fabContainer}>
                <TouchableOpacity style={styles.fab}>
                    <Text style={styles.fabText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        padding: 20,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
    },
    subtitle: {
        fontSize: 16,
        color: "#ccc",
    },
    list: {
        flex: 1,
    },
    card: {
        backgroundColor: "#111",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    cardSubject: {
        fontSize: 14,
        color: "#ccc",
    },
    cardGrade: {
        fontSize: 14,
        color: "#ccc",
    },
    fabContainer: {
        position: "absolute",
        bottom: 20,
        right: 20,
    },
    fab: {
        backgroundColor: "#1e90ff",
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
    },
    fabText: {
        fontSize: 28,
        color: "#fff",
        fontWeight: "bold",
    },
});
