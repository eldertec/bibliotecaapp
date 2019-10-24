import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, Picker } from 'react-native';
import { Platform } from '@unimodules/core';
import { useScreens } from 'react-native-screens';
import api from '../services/api';

import DateTimePicker from '@react-native-community/datetimepicker';

export default function LivroCad() {

    

    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    const [volume, setVolume] = useState('');
    const [dataPublicacao, setDataPublicacao] = useState('');
    const [idGenero, setIdGenero] = useState('');

    const [generos, setGeneros] = useState([]);

    const data = new Date();

    async function carregarGeneros() {
        const response = await api.get("/generos");
        setGeneros(response.data);
    }
    carregarGeneros();

    async function handleSubmit() {
        try {
            const response = await api.post('/livros',
                {
                    dataPublicacao,
                    genero: {id: idGenero},
                    nome,
                    valor,
                    volume
                });

            Alert.alert('Livro salvo com sucesso!');
            setNome('');
            setDataPublicacao('');
            setValor('');
            setVolume('');
            setIdGenero('')

        } catch (error) {
            console.log(error);
            Alert.alert('Tente mais tarde!');
        }

    }

    return (
        <KeyboardAvoidingView
            enabled={Platform.OS == 'ios'}
            behavior="padding"
            style={styles.container} >
            <View style={styles.form}>
                <Text style={styles.titulo}>Cadastro de Livro</Text>
                <TextInput style={styles.input}
                    placeholder="Nome do Livro"
                    placeholderTextColor="#999"
                    value={nome}
                    onChangeText={setNome} />
                <TextInput style={styles.input}
                    placeholder="Volume"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={volume}
                    onChangeText={setVolume} />
                <TextInput style={styles.input}
                    placeholder="Valor"
                    placeholderTextColor="#999"
                    keyboardType="decimal-pad"
                    value={valor}
                    onChangeText={setValor} />
                    <DateTimePicker value={data}
                    display="default"
                    onChange={setDataPublicacao} />
                
                    <Picker selectedValue={idGenero} onValueChange={setIdGenero}>
                        {
                            generos.map(genero => <Picker.Item key={genero.id} label={genero.descricao} value={genero.id}/>)
                        
                        }
                    </Picker>
                <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
                    <Text style={styles.botaoTexto}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titulo: {
        fontSize: 20
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        marginBottom: 20,
        borderRadius: 2
    },
    botao: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    botaoTexto: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }

});
