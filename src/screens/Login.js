import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

// Componente de Login para iniciar sesión
const Login = ({ navigation }) => {
  // Estados para los campos de correo y contraseña
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  // Función para iniciar sesión con Firebase Auth
  const iniciarSesion = async () => {
    try {
      // Intenta iniciar sesión con los datos ingresados
      const userCredential = await signInWithEmailAndPassword(auth, correo, contrasena);
      const user = userCredential.user;

      console.log('Sesión iniciada con:', user.email);

      // Muestra alerta de bienvenida y navega a Home
      Alert.alert('Bienvenido', `Hola, ${user.email}`);
      navigation.navigate('Home'); 

    } catch (error) {
      // Si hay error, muestra alerta
      console.error('Error al iniciar sesión:', error.message);
      Alert.alert('Error', 'Correo o contraseña incorrectos');
    }
  };

  // Estilos para la pantalla y los componentes
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 28,
      textAlign: 'center',
      color: '#1e40af',
      letterSpacing: 1,
    },
    input: {
      height: 44,
      borderColor: '#a5b4fc',
      borderWidth: 1,
      borderRadius: 8,
      paddingLeft: 12,
      backgroundColor: '#fff', 
      shadowColor: '#6366f1',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 6,
      elevation: 3,
      width: '100%',
      fontSize: 16,
      color: '#334155',
    },
    inputContainer: {
      width: '100%',
      padding: 18,
      backgroundColor: '#fff', 
      marginBottom: 18,
      borderRadius: 10,
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
      color: '#2563eb',
      fontWeight: 'bold',
    },
    button: {
      backgroundColor: '#6366f1',
      padding: 14,
      borderRadius: 8,
      marginTop: 24,
      width: '100%',
      alignItems: 'center',
      shadowColor: '#6366f1',
      shadowOpacity: 0.18,
      elevation: 3,
    },
    buttonSecondary: {
      padding: 8,
      borderRadius: 8,
      marginTop: 8,
      marginBottom: 8,
      width: '70%',
      alignItems: 'center',
      alignSelf: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 16,
      letterSpacing: 1,
    },
    secondaryText: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
      letterSpacing: 1,
    },
    secondaryQuestion: {
      color: '#334155', 
    },
    secondaryRegister: {
      color: '#2563eb',
    },
  });

  // Navega a la pantalla de registro
  const irARegistro = () => {
    navigation.navigate('Add')
  };

  return (
    <View style={styles.container}>
      {/* Título de la pantalla */}
      <Text style={styles.title}>Iniciar Sesión</Text>

      {/* Input para el correo electrónico */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Correo electrónico:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCorreo}
          value={correo}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Input para la contraseña */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={setContrasena}
          value={contrasena}
        />
      </View>

      {/* Botón para ir a registro, pequeño y arriba del botón de iniciar sesión */}
      <TouchableOpacity style={styles.buttonSecondary} onPress={irARegistro}>
        <Text style={styles.secondaryText}>
          <Text style={styles.secondaryQuestion}>¿Aún no tienes cuenta? </Text>
          <Text style={styles.secondaryRegister}>Regístrate</Text>
        </Text>
      </TouchableOpacity>

      {/* Botón para iniciar sesión */}
      <TouchableOpacity style={styles.button} onPress={iniciarSesion}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;