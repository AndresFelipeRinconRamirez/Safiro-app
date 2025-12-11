import { StyleSheet, View, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PerfilDetalleScreen() {
  const { user } = useAuth();
  const router = useRouter();

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
          <ThemedText style={styles.title}>Mi Perfil</ThemedText>
        </View>
      </ImageBackground>

      {/* Contenido */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/* Avatar grande */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatarLarge}>
              <ThemedText style={styles.avatarText}>{user?.name?.charAt(0) || 'U'}</ThemedText>
            </View>
          </View>

          {/* Información del usuario */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Información Personal</ThemedText>

            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Ionicons name="person" size={24} color="#6EADC4" />
                <View style={styles.infoContent}>
                  <ThemedText style={styles.infoLabel}>Nombre completo</ThemedText>
                  <ThemedText style={styles.infoValue}>{user?.name || 'Usuario'}</ThemedText>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <Ionicons name="mail" size={24} color="#6EADC4" />
                <View style={styles.infoContent}>
                  <ThemedText style={styles.infoLabel}>Correo electrónico</ThemedText>
                  <ThemedText style={styles.infoValue}>{user?.email}</ThemedText>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <Ionicons name="school" size={24} color="#6EADC4" />
                <View style={styles.infoContent}>
                  <ThemedText style={styles.infoLabel}>
                    {user?.role === 'estudiante' ? 'Carrera' : 'Departamento'}
                  </ThemedText>
                  <ThemedText style={styles.infoValue}>
                    {user?.role === 'estudiante' ? 'Ingeniería de Sistemas' : 'Matemáticas'}
                  </ThemedText>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <Ionicons name="card" size={24} color="#6EADC4" />
                <View style={styles.infoContent}>
                  <ThemedText style={styles.infoLabel}>ID</ThemedText>
                  <ThemedText style={styles.infoValue}>202210345</ThemedText>
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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: -40,
  },
  avatarLarge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ED8A7A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  avatarText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 8,
  },
});