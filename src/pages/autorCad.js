import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, Picker } from 'react-native';
import { Platform } from '@unimodules/core';
import { useScreens } from 'react-native-screens';
import { Header } from 'react-native-elements'
import api from '../services/api';

export default function AutorCad(props) {

    const [nome, setNome] = useState('');
    const [sexo, setSexo] = useState('');

    async function handleSubmit() {
        try {
            const response = await api.post('/autores',
                {
                    nome,
                    sexo
                });

            Alert.alert('Autor salvo com sucesso!');
            setNome('');
            setSexo('');

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
                leftComponent={{ icon: 'menu', color: '#fff', onPress:() => {props.navigation.openDrawer();} }}
                centerComponent={{ text: 'Cadastro de Autor', style: { color: '#fff', fontSize: 20 } }}
                rightComponent={{ icon: 'home', color: '#fff', onPress:() => {props.navigation.navigate('Home');} }}
            />
            <View style={styles.form}>
                <View style={{ marginTop: 30 }}></View>
                <TextInput style={styles.input}
                    placeholder="Nome do Autor"
                    placeholderTextColor="#999"
                    value={nome}
                    onChangeText={setNome} />

                <View style={styles.dataView}>
                    <Text style={styles.labelPicker}>Sexo:</Text>
                    <Picker selectedValue={sexo}
                        onValueChange={setSexo}
                        style={styles.flexPicker}>
                        <Picker.Item label='Masculino' value='MASCULINO' />
                        <Picker.Item label='Feminino' value='FEMININO' />   
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
        marginTop: 300,
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