import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { database, auth } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const AddPerfil = ({ navigation }) => {
  const [perfil, setPerfil] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    titulo: '',
    anioGraduacion: '',
    creado: new Date(),
  });

  const goToHome = () => {
    navigation.goBack();
  };
  
  const gotoLogin = () => 
    {
      navigation.navigate('Login');
  }

  const agregarPerfil = async () => {
    const { correo, contrasena, ...restoPerfil } = perfil;

    try {
      // 1. Registrar usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
      const user = userCredential.user;

      // 2. Guardar información adicional en Firestore
      await addDoc(collection(database, 'usuarios'), {
        ...restoPerfil,
        correo,
        uid: user.uid,
        creado: new Date(),
      });

      console.log('Usuario creado y perfil guardado.');
      Alert.alert('Registro exitoso', 'El perfil se creó correctamente.', [
        { text: 'OK', onPress: goToHome },
      ]);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      Alert.alert('Error de registro', error.message || 'Ocurrió un error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrate</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setPerfil({ ...perfil, nombre: text })}
          value={perfil.nombre}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Correo electrónico:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setPerfil({ ...perfil, correo: text })}
          value={perfil.correo}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={text => setPerfil({ ...perfil, contrasena: text })}
          value={perfil.contrasena}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Título universitario:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setPerfil({ ...perfil, titulo: text })}
          value={perfil.titulo}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Año de graduación:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={text => setPerfil({ ...perfil, anioGraduacion: text })}
          value={perfil.anioGraduacion}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={agregarPerfil}>
        <Text style={styles.buttonText}>Registrarme</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={gotoLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddPerfil;

// Estilos
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
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    letterSpacing: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#2563eb',
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    padding: 6,
    backgroundColor: '#fff', 
    marginBottom: 18,
    borderRadius: 10,
  },
});