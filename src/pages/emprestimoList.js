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

export default function EmprestimoList(props) {
    const [emprestimos, setEmprestimos] = useState([]);
    async function carregarEmprestimos() {
        const response = await api.get("/emprestimos");
        setEmprestimos(response.data);
    }
    carregarEmprestimos();

    function formataData(valor) {
        valor = String(valor).split('-');
        let ano = String(valor[0]);
        let mes = String(valor[1]);
        let dia = String(valor[2]);
        return `${dia}/${mes}/${ano}`;
    }

    return (
        <View style={styles.container}>
            <Header
                containerStyle={{ backgroundColor: '#191970' }}
                leftComponent={{ icon: 'menu', color: '#fff', onPress:() => {props.navigation.openDrawer();} }}
                centerComponent={{ text: 'Lista de Emprestimos', style: { color: '#fff', fontSize: 20 } }}
                rightComponent={{ icon: 'home', color: '#fff', onPress:() => {props.navigation.navigate('Home');} }}
            />
            <FlatList
                data={emprestimos}
                style={styles.lista}
                keyExtractor={emprestimo => `${emprestimo.id}`}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.label}>Id: {item.id}</Text>
                        <Text style={styles.label}>Cliente: {item.cliente.nome}</Text>
                        <Text style={styles.label}>CPF: {item.cliente.cpf}</Text>
                        <Text style={styles.label}>Livro: {item.livro.nome}</Text>
                        <Text style={styles.label}>Data do emprestimo: {formataData(item.dataEmprestimo)}</Text>
                        <Text style={styles.label}>Data da devolução: {formataData(item.dataDevolucao)}</Text>
                        <Text style={styles.label}>Valor: {item.valorEmprestimo}</Text>
                        <TouchableOpacity
                            onPress={async () => {
                                const id = item.id;
                                await api.delete(`/emprestimos/${id}`);
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