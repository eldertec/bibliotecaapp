import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from "react-native";
import { Header } from 'react-native-elements'
import api from "../services/api";

export default function EditoraList() {
    const [editoras, setEditoras] = useState([]);
    async function carregarEditoras() {
        const response = await api.get("/editoras");
        setEditoras(response.data);
    }
    carregarEditoras();

    return (
        <View style={styles.container}><Header
            containerStyle={{ backgroundColor: '#191970' }}
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'Lista de Editoras', style: { color: '#fff', fontSize: 20 } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
        />
            <FlatList
                data={editoras}
                style={styles.lista}
                keyExtractor={editora => `${editora.id}`}
                renderItem={({ item }) => (
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
                )}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#191970",
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch"
    },
    lista: {
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        marginBottom: 20
    },
    label: {
        fontWeight: "bold",
        color: "#000"
    },
    card: {
        backgroundColor: "#ADD8E6",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        marginTop: 10
    },
    botaoTexto: {
        color: "#FF0000",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "right"
    }
});