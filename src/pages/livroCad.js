import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, Picker, DatePickerAndroid } from 'react-native';
import { Platform } from '@unimodules/core';
import { useScreens } from 'react-native-screens';
import { Icon, Header, Input } from 'react-native-elements'
import api from '../services/api';


export default function LivroCad() {

    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    const [volume, setVolume] = useState('');
    const [dataPublicacao, setDataPublicacao] = useState('');
    const [idGenero, setIdGenero] = useState('');
    const [idEditora, setIdEditora] = useState('');
    const [idAutor, setIdAutor] = useState('');

    const [generos, setGeneros] = useState([]);
    const [editoras, setEditoras] = useState([]);
    const [autores, setAutores] = useState([]);


    async function carregarGeneros() {
        const response = await api.get("/generos");
        setGeneros(response.data);
    }

    async function carregarEditoras() {
        const response = await api.get("/editoras");
        setEditoras(response.data);
    }

    async function carregarAutores() {
        const response = await api.get("/autores");
        setAutores(response.data);
    }

    async function carregarDados() {
        try {
            const responseGeneros = await api.get("/generos");
            setGeneros(responseGeneros.data);

            const responseEditoras = await api.get("/editoras");
            setEditoras(responseEditoras.data);

            const responseAutores = await api.get("/autores");
            setAutores(responseAutores.data);

        } catch (error) {
            console.log(error);
            Alert.alert('Erro ao carregar dados!');
        }

    }


    carregarDados();


    async function openAndroidDatePicker() {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                let novaData = year + '-' + (+month + 1) + '-' + day;
                setDataPublicacao(novaData)
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }

    async function handleSubmit() {
        try {
            const response = await api.post('/livros',
                {
                    dataPublicacao,
                    genero: { id: idGenero },
                    editora: { id: idEditora },
                    autor: { id: idAutor },
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
            setIdEditora('')
            setIdAutor('')

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
            <Header
                containerStyle={{ backgroundColor: '#191970' }}
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'Cadastro de Livro', style: { color: '#fff', fontSize: 20 } }}
                rightComponent={{ icon: 'home', color: '#fff' }}
            />
            <View style={styles.form}>
                <View style={{ marginTop: 30 }}></View>
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
                <View style={styles.dataView}>

                    <Icon style={styles.icone}
                        name='ios-calendar'
                        type='ionicon'
                        color='#0000FF'
                        size={30}
                        iconStyle={{ marginRight: 10 }}
                        onPress={openAndroidDatePicker}
                    />

                    <TextInput style={styles.inputData}
                        placeholder="Data da Publicação"
                        placeholderTextColor="#999"
                        editable={false}
                        value={dataPublicacao} />
                </View>
                <View style={styles.dataView}>
                    <Text style={styles.labelPicker}>Gênero:</Text>
                    <Picker selectedValue={idGenero}
                        onValueChange={setIdGenero}
                        style={styles.flexPicker}>
                        {
                            generos.map((genero) => {
                                return <Picker.Item key={genero.id}
                                    label={genero.descricao}
                                    value={genero.id} />
                            })
                        }
                    </Picker>
                </View>
                <View style={styles.dataView}>
                    <Text style={styles.labelPicker}>Editora:</Text>
                    <Picker selectedValue={idEditora} onValueChange={setIdEditora} style={styles.flexPicker}>
                        {
                            editoras.map((editora) => {
                                return <Picker.Item key={editora.id} label={editora.nome} value={editora.id} />
                            })
                        }
                    </Picker>
                </View>
                <View style={styles.dataView}>
                    <Text style={styles.labelPicker}>Autor:</Text>
                    <Picker selectedValue={idAutor} onValueChange={setIdAutor} style={styles.flexPicker}>
                        {
                            autores.map((autor) => {
                                return <Picker.Item key={autor.id} label={autor.nome} value={autor.id} />
                            })
                        }
                    </Picker>
                </View>
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
        alignItems: 'stretch',
        backgroundColor: '#191970'
    },
    titulo: {
        fontSize: 20
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        backgroundColor: '#fff'
    },
    label: {
        fontWeight: 'bold',
        color: '#000',
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
        backgroundColor: '#008000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    botaoTexto: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    dataView: {
        flexDirection: 'row',
        marginBottom: 20
    },
    icone: {
        flex: 1
    },
    inputData: {
        flex: 2,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',

        borderRadius: 2
    },
    labelPicker: {
        flex: 1,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },
    flexPicker: {
        flex: 2
    },
    header: {
        marginTop: 2
    }


});