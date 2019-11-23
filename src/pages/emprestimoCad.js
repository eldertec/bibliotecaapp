import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, Picker, DatePickerAndroid } from 'react-native';
import { Platform } from '@unimodules/core';
import { useScreens } from 'react-native-screens';
import { Icon, Header } from 'react-native-elements'
import api from '../services/api';
import { TextInputMask } from 'react-native-masked-text'

export default function EmprestimoCad(props) {

    const [valorEmprestimo, setValorEmprestimo] = useState('');
    const [dataDevolucao, setDataDevolucao] = useState('');
    const [dataEmprestimo, setDataEmprestimo] = useState('');

    const [idLivro, setIdLivro] = useState('');
    const [idCliente, setIdCliente] = useState('');

    const [livros, setLivros] = useState([]);
    const [clientes, setClientes] = useState([]);

    const [dataDevolucaoFormatada, setDataDevolucaoFormatada] = useState('');
    const [dataEmprestimoFormatada, setDataEmprestimoFormatada] = useState('');

    async function handleSubmit() {
        try {
            const response = await api.post('/emprestimos',
                {
                    cliente: { id: idCliente },
                    dataDevolucao,
                    dataEmprestimo,
                    livro: { id: idLivro },
                    valorEmprestimo
                });

            Alert.alert('Empréstimo salvo com sucesso!');
            setIdCliente('');
            setDataDevolucao('');
            setDataEmprestimo('');
            setIdLivro('');
            setValorEmprestimo('');
            setDataDevolucaoFormatada('');
            setDataEmprestimoFormatada('');

        } catch (error) {
            console.log(error);
            Alert.alert('Tente mais tarde!');
        }

    }

    async function carregarDados() {
        try {
            const responseClientes = await api.get("/clientes");
            setClientes(responseClientes.data);

            const responseLivros = await api.get("/livros");
            setLivros(responseLivros.data);

        } catch (error) {
            console.log(error);
            Alert.alert('Erro ao carregar dados!');
        }

    }

    async function openDataDevolucao() {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                let mes = month + 1;
                let novaData = year + '-' + (mes <= 9 ? '0' + mes : mes) + '-' + (day <= 9 ? '0' + day : day);
                setDataDevolucao(novaData);
                setDataDevolucaoFormatada(formataData(novaData));
                carregarDados();
            }
        } catch ({ code, message }) {
            console.warn('Erro ao abrir o calendario', message);
        }
    }

    async function openDataEmprestimo() {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                let mes = month + 1;
                let novaData = year + '-' + (mes <= 9 ? '0' + mes : mes) + '-' + (day <= 9 ? '0' + day : day);
                setDataEmprestimo(novaData);
                setDataEmprestimoFormatada(formataData(novaData));
            }
        } catch ({ code, message }) {
            console.warn('Erro ao abrir o calendario', message);
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
                leftComponent={{ icon: 'menu', color: '#fff', onPress:() => {props.navigation.openDrawer();} }}
                centerComponent={{ text: 'Empréstimos', style: { color: '#fff', fontSize: 20 } }}
                rightComponent={{ icon: 'home', color: '#fff', onPress:() => {props.navigation.navigate('Home');} }}
            />
            <View style={styles.form}>
                <View style={{ marginTop: 30 }}></View>

                <View style={styles.dataView}>

                    <Icon style={styles.icone}
                        name='ios-calendar'
                        type='ionicon'
                        color='#0000FF'
                        size={30}
                        iconStyle={{ marginRight: 10 }}
                        onPress={openDataEmprestimo}
                    />

                    <TextInput style={styles.inputData}
                        placeholder="Data do Empréstimo"
                        placeholderTextColor="#999"
                        editable={false}
                        value={dataEmprestimoFormatada} />
                </View>

                <View style={styles.dataView}>

                    <Icon style={styles.icone}
                        name='ios-calendar'
                        type='ionicon'
                        color='#0000FF'
                        size={30}
                        iconStyle={{ marginRight: 10 }}
                        onPress={openDataDevolucao}
                    />

                    <TextInput style={styles.inputData}
                        placeholder="Data da Devolução"
                        placeholderTextColor="#999"
                        editable={false}
                        value={dataDevolucaoFormatada} />
                </View>

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
                    value={valorEmprestimo}
                    onChangeText={setValorEmprestimo}
                />

                <View style={styles.dataView}>
                    <Text style={styles.labelPicker}>Cliente:</Text>
                    <Picker selectedValue={idCliente}
                        onValueChange={setIdCliente}
                        style={styles.flexPicker}>
                        {
                            clientes.map((cliente) => {
                                return <Picker.Item key={cliente.id}
                                    label={cliente.nome}
                                    value={cliente.id} />
                            })
                        }
                    </Picker>
                </View>

                <View style={styles.dataView}>
                    <Text style={styles.labelPicker}>Livro:</Text>
                    <Picker selectedValue={idLivro}
                        onValueChange={setIdLivro}
                        style={styles.flexPicker}>
                        {
                            livros.map((livro) => {
                                return <Picker.Item key={livro.id}
                                    label={livro.nome}
                                    value={livro.id} />
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
        backgroundColor: '#fff',
        height: 520
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