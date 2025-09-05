import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { database } from '../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const EditarPerfil = ({ route, navigation }) => {
  const { perfil } = route.params;

  // Usamos solo los campos editables (evitamos correo y contraseña si no se modifican aquí)
  const [form, setForm] = useState({
    nombre: perfil.nombre || '',
    titulo: perfil.titulo || '',
    anioGraduacion: perfil.anioGraduacion || '',
  });

  const handleUpdate = async () => {
    if (!form.nombre || !form.titulo || !form.anioGraduacion) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los campos.');
      return;
    }

    try {
      const ref = doc(database, 'usuarios', perfil.id);
      await updateDoc(ref, {
        nombre: form.nombre,
        titulo: form.titulo,
        anioGraduacion: form.anioGraduacion,
      });

      Alert.alert('Perfil actualizado', 'Los cambios se guardaron correctamente.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      Alert.alert('Error', 'No se pudo actualizar el perfil. Verifica tu conexión o ID del documento.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          value={form.nombre}
          onChangeText={(text) => setForm({ ...form, nombre: text })}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Título universitario:</Text>
        <TextInput
          style={styles.input}
          value={form.titulo}
          onChangeText={(text) => setForm({ ...form, titulo: text })}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Año de graduación:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={form.anioGraduacion}
          onChangeText={(text) => setForm({ ...form, anioGraduacion: text })}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditarPerfil;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#0288d1',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});