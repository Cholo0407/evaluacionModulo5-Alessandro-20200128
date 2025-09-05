import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { database, auth } from '../config/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore'; 
import { signOut } from 'firebase/auth'; // Para cerrar sesión
import CardPerfil from '../components/CardPerfil'; // Usa la card de perfil

const HomePerfil = ({ navigation }) => {
    const [perfil, setPerfil] = useState(null);

    useEffect(() => {
        const user = auth.currentUser; // Obtenemos el usuario autenticado

        if (user) {
            const q = query(
                collection(database, 'usuarios'),
                where('correo', '==', user.email) // Filtramos por correo
            );

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const docs = [];
                querySnapshot.forEach((doc) => {
                    docs.push({ id: doc.id, ...doc.data() });
                });
                setPerfil(docs[0]); // Solo debería haber un perfil
            });

            return () => unsubscribe();
        }
    }, []);

    const goToEdit = (id) => {
        navigation.navigate('Edit', { perfil }); // Pasamos el perfil completo al editar
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigation.navigate('Login'); // Redirigir a la pantalla de Login
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <View style={styles.container}>
            {perfil ? (
                <FlatList
                    data={[perfil]} // Pasamos solo un perfil, ya que solo hay uno
                    renderItem={({ item }) => (
                        <CardPerfil
                            id={item.id}
                            nombre={item.nombre}
                            correo={item.correo}
                            contrasena={item.contrasena}
                            titulo={item.titulo}
                            anioGraduacion={item.anioGraduacion}
                            onEdit={goToEdit}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                />
            ) : (
                <Text style={styles.subtitle}>Cargando perfil...</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                <Text style={styles.buttonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HomePerfil;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', 
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 28,
        color: '#1e40af',
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 20,
        textAlign: 'center',
        color: '#f59e42',
        marginTop: 24,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#6366f1',
        paddingVertical: 10,
        paddingHorizontal: 32,
        borderRadius: 20,
        marginTop: 24,
        alignSelf: 'center',
        shadowColor: '#6366f1',
        shadowOpacity: 0.18,
        elevation: 4,
        minWidth: 140,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
        letterSpacing: 1,
    },
    list: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});