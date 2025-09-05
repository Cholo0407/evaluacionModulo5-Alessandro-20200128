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

// Componente para editar el perfil del usuario
const EditarPerfil = ({ route, navigation }) => {
  // Recibe el perfil desde la navegación
  const { perfil } = route.params;

  // Estado local para los campos editables del perfil
  const [form, setForm] = useState({
    nombre: perfil.nombre || '',
    titulo: perfil.titulo || '',
    anioGraduacion: perfil.anioGraduacion || '',
  });

  // Función para actualizar el perfil en Firestore
  const handleUpdate = async () => {
    // Validación: no permitir campos vacíos
    if (!form.nombre || !form.titulo || !form.anioGraduacion) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los campos.');
      return;
    }

    try {
      // Referencia al documento del usuario en Firestore
      const ref = doc(database, 'usuarios', perfil.id);
      // Actualiza los campos editados
      await updateDoc(ref, {
        nombre: form.nombre,
        titulo: form.titulo,
        anioGraduacion: form.anioGraduacion,
      });

      // Muestra alerta de éxito y regresa a la pantalla anterior
      Alert.alert('Perfil actualizado', 'Los cambios se guardaron correctamente.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      // Muestra alerta de error si falla la actualización
      console.error('Error actualizando perfil:', error);
      Alert.alert('Error', 'No se pudo actualizar el perfil. Verifica tu conexión o ID del documento.');
    }
  };

  return (
    // ScrollView permite desplazamiento si el teclado cubre los inputs
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      {/* Input para el nombre */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          value={form.nombre}
          onChangeText={(text) => setForm({ ...form, nombre: text })}
        />
      </View>

      {/* Input para el título universitario */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Título universitario:</Text>
        <TextInput
          style={styles.input}
          value={form.titulo}
          onChangeText={(text) => setForm({ ...form, titulo: text })}
        />
      </View>

      {/* Input para el año de graduación */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Año de graduación:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={form.anioGraduacion}
          onChangeText={(text) => setForm({ ...form, anioGraduacion: text })}
        />
      </View>

      {/* Botón para guardar los cambios */}
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditarPerfil;

// Estilos para el componente
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
});