import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Componente que muestra la información del perfil en una tarjeta
const CardPerfil = ({ id, nombre, correo, contrasena, titulo, anioGraduacion, onEdit }) => {
    return (
        // Tarjeta visual con los datos del usuario
        <View style={styles.card}>
            {/* Nombre del usuario */}
            <Text style={styles.titulo}>{nombre}</Text>
            {/* Correo electrónico */}
            <Text style={styles.text}>{correo}</Text>
            {/* Contraseña (no recomendable mostrarla, solo para pruebas) */}
            <Text style={styles.text}>{contrasena}</Text>
            {/* Título universitario */}
            <Text style={styles.text}>{titulo}</Text>
            {/* Año de graduación */}
            <Text style={styles.text}>Año de Graduación: {anioGraduacion}</Text>

            {/* Botones alineados horizontalmente */}
            <View style={styles.buttonContainer}>
                {/* Botón para editar el perfil */}
                <TouchableOpacity onPress={() => onEdit(id)}>
                    <Text style={styles.editButton}>Editar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Estilos para la tarjeta y sus elementos
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f0f4ff',
        padding: 24,
        margin: 14,
        borderRadius: 18,
        shadowColor: '#4a90e2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 8,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#dbeafe',
    },
    titulo: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#1e3a8a',
        letterSpacing: 1,
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 6,
        color: '#334155',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 18,
    },
    editButton: {
        backgroundColor: '#2563eb',
        width: 110,
        color: 'white',
        borderRadius: 30,
        padding: 12,
        textAlign: 'center',
        fontWeight: 'bold',
        marginHorizontal: 8,
        shadowColor: '#2563eb',
        shadowOpacity: 0.2,
        elevation: 2,
    },
});

export default CardPerfil;