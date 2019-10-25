import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from "react-native";
import api from "../services/api";

export default function EditoraList() {
    const [editoras, setEditoras] = useState([]);
    async function carregarEditoras() {
        const response = await api.get("/editoras");
        setEditoras(response.data);
    }
    carregarEditoras();

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Lista de Editoras</Text>
            <FlatList
                data={editoras}
                style={styles.lista}
                keyExtractor={editora => `${editora.id}`}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <View style={styles.card}>
                            <Text style={styles.label}>Id: {item.id}</Text>
                            <Text style={styles.label}>Nome: {item.nome}</Text>
                            <TouchableOpacity
                                onPress={async () => {
                                    const id = item.id;
                                    await api.delete(`/editoras/${id}`);
                                }}
                            >
                                <Text style={styles.botaoTexto}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        backgroundColor: "#C0C0C0",
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch"
    },
    lista: {
        paddingHorizontal: 20
    },
    titulo: {
        fontSize: 18,
        marginTop: 30,
        color: "#00008B",
        fontWeight: "bold",
        textAlign: "center"
    },
    label: {
        fontWeight: "bold",
        color: "#000"
    },
    card: {
        backgroundColor: "#DCDCDC",
        borderRadius: 5,
        padding: 10
    },
    botaoTexto: {
        color: "#FF0000",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "right"
    }
});