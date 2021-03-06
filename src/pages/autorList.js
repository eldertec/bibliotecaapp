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

export default function AutorList(props) {
    const [autores, setAutores] = useState([]);
    async function carregarAutores() {
        const response = await api.get("/autores");
        setAutores(response.data);
    }
    carregarAutores();

    return (
        <View style={styles.container}>
            <Header
                containerStyle={{ backgroundColor: '#191970' }}
                leftComponent={{ icon: 'menu', color: '#fff', onPress:() => {props.navigation.openDrawer();} }}
                centerComponent={{ text: 'Lista de Autores', style: { color: '#fff', fontSize: 20 } }}
                rightComponent={{ icon: 'home', color: '#fff', onPress:() => {props.navigation.navigate('Home');} }}
            />
            <FlatList
                data={autores}
                style={styles.lista}
                keyExtractor={autor => `${autor.id}`}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.label}>Id: {item.id}</Text>
                        <Text style={styles.label}>Nome: {item.nome}</Text>
                        <TouchableOpacity
                            onPress={async () => {
                                const id = item.id;
                                await api.delete(`/autores/${id}`);
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