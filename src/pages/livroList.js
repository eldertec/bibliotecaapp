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

export default function LivroList(){
    const [livros, setLivros] = useState([]);
    async function carregarLivros() {
        const response = await api.get("/livros");
        setLivros(response.data);
    }
    carregarLivros();

    return (
        <View style={styles.container}>
            <Card title='Lista de Livros' style={styles.container}>
            <FlatList
                data={livros}
                
                keyExtractor={livro => `${livro.id}`}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View>
                            <Text style={styles.label}>Id:{item.id}</Text>
                            <Text style={styles.label}>Nome: {item.nome}</Text>
                            <Text style={styles.label}>Valor: {item.valor}</Text>
                            <Text style={styles.label}>Volume: {item.volume}</Text>
                            <Text style={styles.label}>Data da Publicação: {item.dataPublicacao}</Text>
                            <Text style={styles.label}>Gênero: {item.genero.descricao}</Text>
                            <Text style={styles.label}>Autor: {item.autor.nome}</Text>
                            <Text style={styles.label}>Editora: {item.editora.nome}</Text>
                            <TouchableOpacity
                                onPress={async () => {
                                    const id = item.id;
                                    await api.delete(`/livros/${id}`);
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