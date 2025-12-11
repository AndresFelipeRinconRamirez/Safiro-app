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
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function SolicitarPermisoScreen() {
  const router = useRouter();
  const [tipoPermiso, setTipoPermiso] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [motivo, setMotivo] = useState('');

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = () => {
    if (!tipoPermiso || !fechaInicio || !fechaFin || !motivo) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    Alert.alert(
      'Permiso Solicitado',
      'Tu solicitud de permiso ha sido enviada y está en revisión.',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

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
          <ThemedText style={styles.title}>Solicitar Permiso</ThemedText>
        </View>
      </ImageBackground>

      {/* Contenido */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          {/* Tipo de permiso */}
          <View style={styles.fieldContainer}>
            <ThemedText style={styles.label}>Tipo de permiso</ThemedText>
            <View style={styles.inputContainer}>
              <Ionicons name="document-text" size={20} color="#6EADC4" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Ej: Médico, Personal, Académico"
                placeholderTextColor="#A0AEC0"
                value={tipoPermiso}
                onChangeText={setTipoPermiso}
              />
            </View>
          </View>

          {/* Fecha de inicio */}
          <View style={styles.fieldContainer}>
            <ThemedText style={styles.label}>Fecha de inicio</ThemedText>
            <View style={styles.inputContainer}>
              <Ionicons name="calendar" size={20} color="#6EADC4" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#A0AEC0"
                value={fechaInicio}
                onChangeText={setFechaInicio}
              />
            </View>
          </View>

          {/* Fecha de fin */}
          <View style={styles.fieldContainer}>
            <ThemedText style={styles.label}>Fecha de fin</ThemedText>
            <View style={styles.inputContainer}>
              <Ionicons name="calendar" size={20} color="#6EADC4" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#A0AEC0"
                value={fechaFin}
                onChangeText={setFechaFin}
              />
            </View>
          </View>

          {/* Motivo */}
          <View style={styles.fieldContainer}>
            <ThemedText style={styles.label}>Motivo del permiso</ThemedText>
            <View style={[styles.inputContainer, styles.textAreaContainer]}>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe el motivo de tu solicitud..."
                placeholderTextColor="#A0AEC0"
                value={motivo}
                onChangeText={setMotivo}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Información adicional */}
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={24} color="#6EADC4" />
            <ThemedText style={styles.infoText}>
              Tu solicitud será revisada por el coordinador académico. Recibirás una notificación
              con la respuesta en un plazo máximo de 48 horas.
            </ThemedText>
          </View>

          {/* Botón de enviar */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <ThemedText style={styles.submitButtonText}>Enviar solicitud</ThemedText>
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
    gap: 20,
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
  content: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
    gap: 20,
  },
  fieldContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#2D3748',
  },
  textAreaContainer: {
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 8,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#E6F7FF',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    marginTop: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#2D3748',
    lineHeight: 20,
  },
  submitButton: {
    backgroundColor: '#6EADC4',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
