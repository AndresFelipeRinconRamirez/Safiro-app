import { StyleSheet, View, TouchableOpacity, ScrollView, ImageBackground, Switch } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function AjustesScreen() {
  const router = useRouter();
  const [notificaciones, setNotificaciones] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);

  const handleBack = () => {
    router.back();
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
          <ThemedText style={styles.title}>Ajustes</ThemedText>
        </View>
      </ImageBackground>

      {/* Contenido */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/* Sección de notificaciones */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Notificaciones</ThemedText>

            <View style={styles.settingCard}>
              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Ionicons name="notifications" size={24} color="#6EADC4" />
                  <View style={styles.settingText}>
                    <ThemedText style={styles.settingLabel}>Notificaciones push</ThemedText>
                    <ThemedText style={styles.settingDescription}>
                      Recibir notificaciones de notas y avisos
                    </ThemedText>
                  </View>
                </View>
                <Switch
                  value={notificaciones}
                  onValueChange={setNotificaciones}
                  trackColor={{ false: '#CBD5E0', true: '#6EADC4' }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </View>
          </View>

          {/* Sección de apariencia */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Apariencia</ThemedText>

            <View style={styles.settingCard}>
              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Ionicons name="moon" size={24} color="#6EADC4" />
                  <View style={styles.settingText}>
                    <ThemedText style={styles.settingLabel}>Modo oscuro</ThemedText>
                    <ThemedText style={styles.settingDescription}>
                      Activar tema oscuro
                    </ThemedText>
                  </View>
                </View>
                <Switch
                  value={modoOscuro}
                  onValueChange={setModoOscuro}
                  trackColor={{ false: '#CBD5E0', true: '#6EADC4' }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </View>
          </View>

          {/* Sección de cuenta */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Cuenta</ThemedText>

            <View style={styles.settingCard}>
              <TouchableOpacity style={styles.settingRow} activeOpacity={0.7}>
                <View style={styles.settingInfo}>
                  <Ionicons name="key" size={24} color="#6EADC4" />
                  <View style={styles.settingText}>
                    <ThemedText style={styles.settingLabel}>Cambiar contraseña</ThemedText>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#A0AEC0" />
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity style={styles.settingRow} activeOpacity={0.7}>
                <View style={styles.settingInfo}>
                  <Ionicons name="mail" size={24} color="#6EADC4" />
                  <View style={styles.settingText}>
                    <ThemedText style={styles.settingLabel}>Cambiar correo</ThemedText>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#A0AEC0" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Sección de información */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Información</ThemedText>

            <View style={styles.settingCard}>
              <TouchableOpacity style={styles.settingRow} activeOpacity={0.7}>
                <View style={styles.settingInfo}>
                  <Ionicons name="document-text" size={24} color="#6EADC4" />
                  <View style={styles.settingText}>
                    <ThemedText style={styles.settingLabel}>Términos y condiciones</ThemedText>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#A0AEC0" />
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity style={styles.settingRow} activeOpacity={0.7}>
                <View style={styles.settingInfo}>
                  <Ionicons name="shield-checkmark" size={24} color="#6EADC4" />
                  <View style={styles.settingText}>
                    <ThemedText style={styles.settingLabel}>Política de privacidad</ThemedText>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#A0AEC0" />
              </TouchableOpacity>

              <View style={styles.divider} />

              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Ionicons name="information-circle" size={24} color="#6EADC4" />
                  <View style={styles.settingText}>
                    <ThemedText style={styles.settingLabel}>Versión</ThemedText>
                    <ThemedText style={styles.settingDescription}>1.0.0</ThemedText>
                  </View>
                </View>
              </View>
            </View>
          </View>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 12,
  },
  settingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 16,
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  settingDescription: {
    fontSize: 14,
    color: '#718096',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 12,
  },
});