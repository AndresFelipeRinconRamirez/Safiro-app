import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Datos mock de solicitudes pendientes
const SOLICITUDES_PENDIENTES = [
  {
    id: '1',
    tipo: 'Permiso Médico',
    fechaInicio: '15/12/2025',
    fechaFin: '16/12/2025',
    motivo: 'Cita médica especializada con el Dr. González',
    estado: 'pendiente',
    fechaSolicitud: '10/12/2025',
  },
  {
    id: '2',
    tipo: 'Permiso Personal',
    fechaInicio: '20/12/2025',
    fechaFin: '20/12/2025',
    motivo: 'Trámite legal urgente que requiere presencia',
    estado: 'en_revision',
    fechaSolicitud: '08/12/2025',
  },
  {
    id: '3',
    tipo: 'Permiso Académico',
    fechaInicio: '18/12/2025',
    fechaFin: '19/12/2025',
    motivo: 'Participación en congreso nacional de ingeniería',
    estado: 'pendiente',
    fechaSolicitud: '05/12/2025',
  },
];

export default function SolicitudesPermisoScreen() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleVerDetalle = (solicitud: (typeof SOLICITUDES_PENDIENTES)[0]) => {
    Alert.alert(
      solicitud.tipo,
      `Fechas: ${solicitud.fechaInicio} - ${solicitud.fechaFin}\n\nMotivo: ${solicitud.motivo}\n\nEstado: ${getEstadoTexto(solicitud.estado)}`,
      [{ text: 'Cerrar' }]
    );
  };

  const getEstadoTexto = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return 'Pendiente de revisión';
      case 'en_revision':
        return 'En revisión';
      default:
        return estado;
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return '#F59E0B';
      case 'en_revision':
        return '#3B82F6';
      default:
        return '#6B7280';
    }
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
          <ThemedText style={styles.title}>Solicitudes de Permiso</ThemedText>
        </View>
      </ImageBackground>

      {/* Contenido */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/* Contador de solicitudes */}
          <View style={styles.counterCard}>
            <View style={styles.counterIcon}>
              <Ionicons name="document-text" size={28} color="#6EADC4" />
            </View>
            <View style={styles.counterInfo}>
              <ThemedText style={styles.counterNumber}>{SOLICITUDES_PENDIENTES.length}</ThemedText>
              <ThemedText style={styles.counterLabel}>Solicitudes activas</ThemedText>
            </View>
          </View>

          {/* Lista de solicitudes */}
          <View style={styles.solicitudesContainer}>
            {SOLICITUDES_PENDIENTES.map((solicitud) => (
              <TouchableOpacity
                key={solicitud.id}
                style={styles.solicitudCard}
                onPress={() => handleVerDetalle(solicitud)}
                activeOpacity={0.7}
              >
                <View style={styles.solicitudHeader}>
                  <View style={styles.solicitudTitleContainer}>
                    <Ionicons name="clipboard" size={20} color="#6EADC4" />
                    <ThemedText style={styles.solicitudTipo}>{solicitud.tipo}</ThemedText>
                  </View>
                  <View
                    style={[
                      styles.estadoBadge,
                      { backgroundColor: `${getEstadoColor(solicitud.estado)}20` },
                    ]}
                  >
                    <ThemedText
                      style={[styles.estadoText, { color: getEstadoColor(solicitud.estado) }]}
                    >
                      {getEstadoTexto(solicitud.estado)}
                    </ThemedText>
                  </View>
                </View>

                <View style={styles.solicitudBody}>
                  <View style={styles.solicitudRow}>
                    <Ionicons name="calendar-outline" size={16} color="#718096" />
                    <ThemedText style={styles.solicitudInfo}>
                      {solicitud.fechaInicio} - {solicitud.fechaFin}
                    </ThemedText>
                  </View>

                  <View style={styles.solicitudRow}>
                    <Ionicons name="chatbox-ellipses-outline" size={16} color="#718096" />
                    <ThemedText style={styles.solicitudMotivo} numberOfLines={2}>
                      {solicitud.motivo}
                    </ThemedText>
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.solicitudFooter}>
                    <ThemedText style={styles.fechaSolicitud}>
                      Solicitado: {solicitud.fechaSolicitud}
                    </ThemedText>
                    <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
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
  counterCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  counterIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E6F7FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterInfo: {
    flex: 1,
  },
  counterNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  counterLabel: {
    fontSize: 16,
    color: '#718096',
    marginTop: 4,
  },
  solicitudesContainer: {
    gap: 16,
  },
  solicitudCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  solicitudHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F7FAFC',
  },
  solicitudTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  solicitudTipo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  estadoBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  estadoText: {
    fontSize: 12,
    fontWeight: '600',
  },
  solicitudBody: {
    padding: 16,
    gap: 12,
  },
  solicitudRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  solicitudInfo: {
    fontSize: 14,
    color: '#4A5568',
  },
  solicitudMotivo: {
    flex: 1,
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 4,
  },
  solicitudFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fechaSolicitud: {
    fontSize: 13,
    color: '#A0AEC0',
  },
});