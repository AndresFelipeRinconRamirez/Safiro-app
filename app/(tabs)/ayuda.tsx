import { StyleSheet, View, TouchableOpacity, ScrollView, ImageBackground, TextInput, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function AyudaScreen() {
  const router = useRouter();
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleBack = () => {
    router.back();
  };

  const handleEnviar = () => {
    if (!asunto.trim() || !mensaje.trim()) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los campos antes de enviar.');
      return;
    }

    // Simular envío de correo
    Alert.alert(
      'Mensaje enviado',
      'Tu solicitud ha sido enviada al equipo de soporte. Te responderemos pronto.',
      [
        {
          text: 'OK',
          onPress: () => {
            setAsunto('');
            setMensaje('');
            router.back();
          },
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
          <ThemedText style={styles.title}>Centro de Ayuda</ThemedText>
        </View>
      </ImageBackground>

      {/* Contenido */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/* Información */}
          <View style={styles.infoCard}>
            <View style={styles.iconContainer}>
              <Ionicons name="help-circle" size={48} color="#6EADC4" />
            </View>
            <ThemedText style={styles.infoTitle}>¿Necesitas ayuda?</ThemedText>
            <ThemedText style={styles.infoText}>
              Envíanos un mensaje describiendo tu problema o consulta. Nuestro equipo de soporte
              te responderá lo antes posible.
            </ThemedText>
          </View>

          {/* Formulario */}
          <View style={styles.formSection}>
            <ThemedText style={styles.label}>Asunto</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Escribe el asunto de tu consulta"
              placeholderTextColor="#A0AEC0"
              value={asunto}
              onChangeText={setAsunto}
            />

            <ThemedText style={styles.label}>Mensaje</ThemedText>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe tu problema o consulta..."
              placeholderTextColor="#A0AEC0"
              value={mensaje}
              onChangeText={setMensaje}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          {/* Información de contacto */}
          <View style={styles.contactCard}>
            <ThemedText style={styles.contactTitle}>Otros medios de contacto</ThemedText>

            <View style={styles.contactItem}>
              <Ionicons name="mail-outline" size={24} color="#4A5568" />
              <View style={styles.contactInfo}>
                <ThemedText style={styles.contactLabel}>Correo electrónico</ThemedText>
                <ThemedText style={styles.contactValue}>soporte@safiro.edu</ThemedText>
              </View>
            </View>

            <View style={styles.contactItem}>
              <Ionicons name="call-outline" size={24} color="#4A5568" />
              <View style={styles.contactInfo}>
                <ThemedText style={styles.contactLabel}>Teléfono</ThemedText>
                <ThemedText style={styles.contactValue}>+57 (1) 234-5678</ThemedText>
              </View>
            </View>

            <View style={styles.contactItem}>
              <Ionicons name="time-outline" size={24} color="#4A5568" />
              <View style={styles.contactInfo}>
                <ThemedText style={styles.contactLabel}>Horario de atención</ThemedText>
                <ThemedText style={styles.contactValue}>Lun - Vie: 8:00 AM - 6:00 PM</ThemedText>
              </View>
            </View>
          </View>

          {/* Botón de enviar */}
          <TouchableOpacity style={styles.enviarButton} onPress={handleEnviar}>
            <Ionicons name="send" size={20} color="#FFFFFF" />
            <ThemedText style={styles.enviarText}>Enviar mensaje</ThemedText>
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
  contentContainer: {
    padding: 20,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 22,
  },
  formSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: '#2D3748',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  textArea: {
    height: 150,
    paddingTop: 16,
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D3748',
  },
  enviarButton: {
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
  enviarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});