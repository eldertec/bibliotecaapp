import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from "react-native";
import { Card } from "react-native-elements";
import api from "../services/api";

export default function GeneroList() {
    const [generos, setGeneros] = useState([]);
    async function carregarGeneros() {
        const response = await api.get("/generos");
        setGeneros(response.data);
    }
    carregarGeneros();

    return (
        <View style={styles.container}>
            <Card title='Lista de Genero'>
            <FlatList
                data={generos}
                
                keyExtractor={genero => `${genero.id}`}
                renderItem={({ item }) => (
                    <View >
                        <View >
                            <Text style={styles.label}>Id: {item.id}</Text>
                            <Text style={styles.label}>Descrição: {item.descricao}</Text>
                            <TouchableOpacity
                                onPress={async () => {
                                    const id = item.id;
                                    await api.delete(`/generos/${id}`);
                                }}
                            >
                                <Text style={styles.botaoTexto}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            /></Card>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        backgroundColor: "#0000FF",
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
        color: "#FFF",
        fontWeight: "bold",
        textAlign: "center"
    },
    label: {
        fontWeight: "bold",
        color: "#444"
    },
    card: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 10
    },
    botaoTexto: {
        color: "#f05a5b",
        fontWeight: "bold",
        fontSize: 16
    }
});