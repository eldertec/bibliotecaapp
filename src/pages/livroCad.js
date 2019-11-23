import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, Picker, DatePickerAndroid } from 'react-native';
import { Platform } from '@unimodules/core';
import { useScreens } from 'react-native-screens';
import { Icon, Header } from 'react-native-elements'
import { TextInputMask } from 'react-native-masked-text'
import api from '../services/api';


export default function LivroCad(props) {

    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    const [volume, setVolume] = useState('');
    const [dataPublicacao, setDataPublicacao] = useState('');
    const [idGenero, setIdGenero] = useState('');
    const [idEditora, setIdEditora] = useState('');
    const [idAutor, setIdAutor] = useState('');

    const [dataFormatada, setDataFormatada] = useState('');

    const [generos, setGeneros] = useState([]);
    const [editoras, setEditoras] = useState([]);
    const [autores, setAutores] = useState([]);

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

    async function openAndroidDatePicker() {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                let mes = month + 1;
                let novaData = year + '-' + (mes <= 9 ? '0' + mes : mes) + '-' + (day <= 9 ? '0' + day : day);
                setDataPublicacao(novaData);
                setDataFormatada(formataData(novaData))
                carregarDados();
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }

    async function handleSubmit() {
        try {
            const response = await api.post('/livros',
                {
                    autor: { id: idAutor },
                    dataPublicacao,
                    editora: { id: idEditora },
                    genero: { id: idGenero },
                    nome,
                    valor,
                    volume
                });

            Alert.alert('Livro salvo com sucesso!');
            setNome('');
            setDataPublicacao('');
            setValor('');
            setVolume('');
            setIdGenero('');
            setIdEditora('');
            setIdAutor('');
            setDataFormatada('');

        } catch (error) {
            console.log(error);
            Alert.alert('Tente mais tarde!');
        }

    }

    function formataData(valor) {
            valor = String(valor).split('-');
            let ano = String(valor[0]);
            let mes = String(valor[1]);
            let dia = String(valor[2]);
            return `${dia}/${mes}/${ano}`;   
    }

    return (
        <KeyboardAvoidingView
            enabled={Platform.OS == 'ios'}
            behavior="padding"
            style={styles.container} >
            <Header
                containerStyle={{ backgroundColor: '#191970' }}
                leftComponent={{ icon: 'menu', color: '#fff', onPress: () => { props.navigation.openDrawer(); } }}
                centerComponent={{ text: 'Cadastro de Livro', style: { color: '#fff', fontSize: 20 } }}
                rightComponent={{ icon: 'home', color: '#fff', onPress: () => { props.navigation.navigate('Home'); } }}
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

                <TextInputMask style={styles.input}
                    placeholder="Valor"
                    placeholderTextColor="#999"
                    keyboardType="decimal-pad"
                    type={'money'}
                    options={{
                        precision: 2,
                        separator: '.',
                        delimiter: ',',
                        unit: '',
                        suffixUnit: ''
                    }}
                    value={valor}
                    onChangeText={setValor}
                />

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
                        value={dataFormatada} />
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
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 20,
        backgroundColor: '#fff'
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
        borderRadius: 2,
        marginBottom: 20
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
    }
});
