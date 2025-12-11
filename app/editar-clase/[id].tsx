import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  TextInput,
  Alert,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

// Datos mock de las clases del profesor
const CLASES_DATA = {
  '1': {
    nombre: 'Ecuaciones diferenciales',
    estudiantes: [
      { id: 1, nombre: 'Ana García', nota: 4.2 },
      { id: 2, nombre: 'Carlos Pérez', nota: 3.5 },
      { id: 3, nombre: 'Diana Rodríguez', nota: 2.8 },
      { id: 4, nombre: 'Eduardo López', nota: 4.0 },
      { id: 5, nombre: 'Fernanda Cruz', nota: 3.7 },
      { id: 6, nombre: 'Gabriel Silva', nota: 2.5 },
      { id: 7, nombre: 'Helena Martínez', nota: 4.5 },
      { id: 8, nombre: 'Ignacio Torres', nota: 3.9 },
    ],
  },
  '2': {
    nombre: 'Ecuaciones integrales',
    estudiantes: [
      { id: 1, nombre: 'Julia Ramírez', nota: 4.3 },
      { id: 2, nombre: 'Kevin Mendoza', nota: 4.0 },
      { id: 3, nombre: 'Laura Gómez', nota: 2.9 },
      { id: 4, nombre: 'Mario Castro', nota: 4.2 },
      { id: 5, nombre: 'Natalia Vargas', nota: 4.5 },
      { id: 6, nombre: 'Oscar Reyes', nota: 3.8 },
      { id: 7, nombre: 'Patricia Díaz', nota: 4.1 },
      { id: 8, nombre: 'Ricardo Morales', nota: 2.7 },
    ],
  },
  '3': {
    nombre: 'Algebra Lineal',
    estudiantes: [
      { id: 1, nombre: 'Sara Ortiz', nota: 4.0 },
      { id: 2, nombre: 'Tomás Ruiz', nota: 3.6 },
      { id: 3, nombre: 'Valentina Herrera', nota: 2.6 },
      { id: 4, nombre: 'Walter Campos', nota: 4.3 },
      { id: 5, nombre: 'Ximena Rojas', nota: 4.1 },
      { id: 6, nombre: 'Yolanda Soto', nota: 3.5 },
      { id: 7, nombre: 'Zacarías Flores', nota: 2.8 },
      { id: 8, nombre: 'Andrea Vega', nota: 4.4 },
    ],
  },
};

export default function EditarClaseScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const clase = CLASES_DATA[id as keyof typeof CLASES_DATA];

  // Estado para manejar las notas editables
  const [notas, setNotas] = useState<{ [key: number]: string }>(
    clase
      ? clase.estudiantes.reduce((acc, estudiante) => {
          acc[estudiante.id] = estudiante.nota.toString();
          return acc;
        }, {} as { [key: number]: string })
      : {}
  );

  const handleBack = () => {
    router.back();
  };

  const handleNotaChange = (estudianteId: number, valor: string) => {
    // Validar que solo sean números y un punto decimal
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(valor) || valor === '') {
      setNotas((prev) => ({
        ...prev,
        [estudianteId]: valor,
      }));
    }
  };

  const handleGuardar = () => {
    // Validar que todas las notas estén en el rango válido
    const notasInvalidas = Object.entries(notas).filter(([_, nota]) => {
      const notaNum = parseFloat(nota);
      return isNaN(notaNum) || notaNum < 0 || notaNum > 5;
    });

    if (notasInvalidas.length > 0) {
      Alert.alert('Error', 'Por favor verifica que todas las notas estén entre 0 y 5');
      return;
    }

    // Simular guardado
    Alert.alert(
      'Notas actualizadas',
      'Las notas se han guardado correctamente',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  if (!clase) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Clase no encontrada</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {/* Header con imagen de fondo */}
      <ImageBackground
        source={require('@/assets/images/fondo-app.png')}
        style={styles.header}
        resizeMode="cover"
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
            <ThemedText style={styles.backText}>Atrás</ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.title}>Editar Notas</ThemedText>
          <ThemedText style={styles.subtitle}>{clase.nombre}</ThemedText>
        </View>
      </ImageBackground>

      {/* Contenido */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/* Instrucciones */}
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={24} color="#6EADC4" />
            <ThemedText style={styles.infoText}>
              Edita las notas de los estudiantes. Las notas deben estar entre 0.0 y 5.0
            </ThemedText>
          </View>

          {/* Lista de estudiantes con inputs editables */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>
              Estudiantes ({clase.estudiantes.length})
            </ThemedText>

            {clase.estudiantes.map((estudiante) => (
              <View key={estudiante.id} style={styles.estudianteCard}>
                <View style={styles.estudianteInfo}>
                  <View style={styles.estudianteAvatar}>
                    <ThemedText style={styles.estudianteAvatarText}>
                      {estudiante.nombre.charAt(0)}
                    </ThemedText>
                  </View>
                  <View style={styles.estudianteTexto}>
                    <ThemedText style={styles.estudianteNombre}>{estudiante.nombre}</ThemedText>
                    <ThemedText style={styles.notaAnterior}>
                      Nota anterior: {estudiante.nota.toFixed(1)}
                    </ThemedText>
                  </View>
                </View>

                <View style={styles.notaInputContainer}>
                  <TextInput
                    style={styles.notaInput}
                    value={notas[estudiante.id]}
                    onChangeText={(text) => handleNotaChange(estudiante.id, text)}
                    keyboardType="decimal-pad"
                    maxLength={4}
                    placeholder="0.0"
                  />
                </View>
              </View>
            ))}
          </View>

          {/* Botón de guardar */}
          <TouchableOpacity style={styles.guardarButton} onPress={handleGuardar}>
            <Ionicons name="save" size={20} color="#FFFFFF" />
            <ThemedText style={styles.guardarText}>Guardar cambios</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    gap: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#E6F3F7',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  infoCard: {
    backgroundColor: '#EBF8FF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#6EADC4',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#2C5282',
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 12,
  },
  estudianteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  estudianteInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  estudianteAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6EADC4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  estudianteAvatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  estudianteTexto: {
    flex: 1,
  },
  estudianteNombre: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  notaAnterior: {
    fontSize: 13,
    color: '#718096',
    marginTop: 2,
  },
  notaInputContainer: {
    marginLeft: 12,
  },
  notaInput: {
    backgroundColor: '#F7FAFC',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'center',
    minWidth: 80,
  },
  guardarButton: {
    backgroundColor: '#6EADC4',
    borderRadius: 12,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  guardarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});