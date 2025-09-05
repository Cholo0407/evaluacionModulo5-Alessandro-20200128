import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CardPerfil = ({ id, nombre, correo, contrasena, titulo, anioGraduacion, onEdit }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.titulo}>{nombre}</Text>
            <Text style={styles.text}>{correo}</Text>
            <Text style={styles.text}>{contrasena}</Text>
            <Text style={styles.text}>{titulo}</Text>
            <Text style={styles.text}>Año de Graduación: {anioGraduacion}</Text>

            {/* Botones alineados horizontalmente */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => onEdit(id)}>
                    <Text style={styles.editButton}>Editar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 20,
        margin: 10,
        borderRadius: 10,
        elevation: 5,
    },
    titulo: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 15,
    },
    deleteButton: {
        backgroundColor: '#ff0000',
        width: 100,
        color: 'white',
        borderRadius: 25,
        padding: 10,
        textAlign: 'center',
    },
    editButton: {
        backgroundColor: '#00ac25',
        width: 100,
        color: 'white',
        borderRadius: 25,
        padding: 10,
        textAlign: 'center',
    },
});

export default CardPerfil;