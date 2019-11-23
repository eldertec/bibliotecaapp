import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, Modal, Button, Picker, ScrollView } from 'react-native';
import { Platform } from '@unimodules/core';
import { useScreens } from 'react-native-screens';
import { Header } from 'react-native-elements'
import api from '../services/api';

export default function ClienteCad(props) {

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [idEndereco, setIdEndereco] = useState('');
    const [sexo, setSexo] = useState('');
    const [telefone, setTelefone] = useState('');


    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [complemento, setComplemento] = useState('');
    const [estado, setEstado] = useState('');
    const [lote, setLote] = useState('');
    const [numero, setNumero] = useState('');
    const [pais, setPais] = useState('');
    const [quadra, setQuadra] = useState('');
    const [rua, setRua] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [btnSalvar, setBtnSalvar] = useState(true);

    async function handleSubmit() {
        try {
            const response = await api.post('/clientes',
                {
                    cpf,
                    email,
                    endereco: { id: idEndereco },
                    nome,
                    sexo,
                    telefone
                });

            Alert.alert('Cliente salvo com sucesso!');
            setNome('');
            setCpf('');
            setEmail('');
            setSexo('');
            setTelefone('');
            setIdEndereco('');

        } catch (error) {
            console.log(error);
            Alert.alert('Tente mais tarde!');
        }

    }

    async function handleSubmitEndereco() {
        try {
            const response = await api.post('/enderecos',
                {
                    bairro,
                    cidade,
                    complemento,
                    estado,
                    lote,
                    numero,
                    pais,
                    quadra,
                    rua
                });

            setIdEndereco(response.data.id);
            setBtnSalvar(false);
            closeModal();
            Alert.alert('Endereço adicionado com sucesso!');
            setBairro('');
            setCidade('');
            setComplemento('');
            setEstado('');
            setLote('');
            setNumero('');
            setPais('');
            setQuadra('');
            setRua('');

        } catch (error) {
            console.log(error);
            Alert.alert('Tente mais tarde!');
        }

    }


    function openModal() {
        setModalVisible(true);
    };

    function closeModal() {
        setModalVisible(false);
    }

    return (
        <KeyboardAvoidingView
            enabled={Platform.OS == 'ios'}
            behavior="padding"
            style={styles.container} >
            <Header
                containerStyle={{ backgroundColor: '#191970' }}
                leftComponent={{ icon: 'menu', color: '#fff', onPress:() => {props.navigation.openDrawer();} }}
                centerComponent={{ text: 'Cadastro de Cliente', style: { color: '#fff', fontSize: 20 } }}
                rightComponent={{ icon: 'home', color: '#fff', onPress:() => {props.navigation.navigate('Home');} }}
            />
            <View style={styles.form}>
                <View style={{ marginTop: 30 }}></View>
                <TextInput style={styles.input}
                    placeholder="Nome"
                    placeholderTextColor="#999"
                    value={nome}
                    onChangeText={setNome} />
                <TextInput style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail} />
                <TextInput style={styles.input}
                    placeholder="CPF"
                    placeholderTextColor="#999"
                    value={cpf}
                    onChangeText={setCpf} />
                <TextInput style={styles.input}
                    placeholder="Telefone"
                    placeholderTextColor="#999"
                    value={telefone}
                    onChangeText={setTelefone} />
                <View style={styles.dataView}>
                    <Text style={styles.labelPicker}>Sexo:</Text>
                    <Picker selectedValue={sexo}
                        onValueChange={setSexo}
                        style={styles.flexPicker}>
                        <Picker.Item label='Masculino' value='MASCULINO' />
                        <Picker.Item label='Feminino' value='FEMININO' />
                    </Picker>
                </View>

                <View style={{ marginBottom: 30 }}>
                    <Modal
                        visible={modalVisible}
                        animationType={'slide'}
                        onRequestClose={() => closeModal()}
                    >
                        <View style={styles.modalContainer}>
                            <ScrollView style={styles.form}>
                                <View style={{ marginTop: 30 }}></View>
                                <TextInput style={styles.input}
                                    placeholder="Rua"
                                    placeholderTextColor="#999"
                                    value={rua}
                                    onChangeText={setRua} />
                                <TextInput style={styles.input}
                                    placeholder="Quadra"
                                    placeholderTextColor="#999"
                                    value={quadra}
                                    onChangeText={setQuadra} />
                                <TextInput style={styles.input}
                                    placeholder="Lote"
                                    placeholderTextColor="#999"
                                    value={lote}
                                    onChangeText={setLote} />
                                <TextInput style={styles.input}
                                    placeholder="Número"
                                    placeholderTextColor="#999"
                                    value={numero}
                                    onChangeText={setNumero} />
                                <TextInput style={styles.input}
                                    placeholder="Complemento"
                                    placeholderTextColor="#999"
                                    value={complemento}
                                    onChangeText={setComplemento} />
                                <TextInput style={styles.input}
                                    placeholder="Bairro"
                                    placeholderTextColor="#999"
                                    value={bairro}
                                    onChangeText={setBairro} />
                                <TextInput style={styles.input}
                                    placeholder="Cidade"
                                    placeholderTextColor="#999"
                                    value={cidade}
                                    onChangeText={setCidade} />
                                <TextInput style={styles.input}
                                    placeholder="Estado"
                                    placeholderTextColor="#999"
                                    value={estado}
                                    onChangeText={setEstado} />
                                <TextInput style={styles.input}
                                    placeholder="Pais"
                                    placeholderTextColor="#999"
                                    value={pais}
                                    onChangeText={setPais} />
                                <Button
                                    onPress={() => handleSubmitEndereco()}
                                    title="Incluir"
                                >
                                </Button>
                            </ScrollView>
                        </View>
                    </Modal>
                    <Button
                        onPress={() => openModal()}
                        title="Adicionar Endereço"
                    />
                </View>

                <Button
                    onPress={() => handleSubmit()}
                    title="Salvar"
                    color="#008000"
                    disabled={btnSalvar}
                />
                <View style={{ marginBottom: 30 }}></View>
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
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    innerContainer: {
        alignItems: 'center',
    }
});