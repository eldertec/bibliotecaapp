import React, { useState } from "react";
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from "react-native";
import { Header } from 'react-native-elements'

export default function Home() {

    return (
        <ImageBackground source={require('../../assets/fundo.jpg')} style={{ width: '100%', height: '100%' }}>
            <View style={styles.container}>
                <Text style={styles.titulo}>Biblioteca</Text>
                <Text style={styles.pos}>Pós-Graduação - 2019</Text>
            </View>
        </ImageBackground>
    );

}

const styles = StyleSheet.create({
    container: {
        marginVertical: "50%"
    },
    titulo: {
        textAlign: "center",
        fontSize: 52,
        color: "#191970",
        fontWeight: "bold",
        backgroundColor: "#fff"
    },
    pos: {
        textAlign: "center",
        fontSize: 32,
        color: "#191970",
        backgroundColor: "#fff"
    }
});