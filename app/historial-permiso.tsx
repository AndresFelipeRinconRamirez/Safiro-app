import { StyleSheet, View, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Datos mock de historial de permisos
const HISTORIAL_PERMISOS = [
  {
    id: '1',
    tipo: 'Permiso Médico',
    fechaInicio: '01/12/2025',
    fechaFin: '02/12/2025',
    motivo: 'Cirugía menor programada',
    estado: 'aprobado',
    fechaSolicitud: '25/11/2025',
    fechaRespuesta: '26/11/2025',
    aprobadoPor: 'Dr. Carlos Ramírez',
  },
  {
    id: '2',
    tipo: 'Permiso Personal',
    fechaInicio: '28/11/2025',
    fechaFin: '28/11/2025',
    motivo: 'Asunto personal familiar',
    estado: 'rechazado',
    fechaSolicitud: '20/11/2025',
    fechaRespuesta: '21/11/2025',
    aprobadoPor: 'Dr. Carlos Ramírez',
    motivoRechazo: 'Fecha no justificada, se requiere evidencia médica',
  },
  {
    id: '3',
    tipo: 'Permiso Académico',
    fechaInicio: '15/11/2025',
    fechaFin: '17/11/2025',
    motivo: 'Congreso internacional de tecnología',
    estado: 'aprobado',
    fechaSolicitud: '01/11/2025',
    fechaRespuesta: '02/11/2025',
    aprobadoPor: 'Dra. María López',
  },
  {
    id: '4',
    tipo: 'Permiso Médico',
    fechaInicio: '10/11/2025',
    fechaFin: '10/11/2025',
    motivo: 'Exámenes médicos de rutina',
    estado: 'aprobado',
    fechaSolicitud: '05/11/2025',
    fechaRespuesta: '06/11/2025',
    aprobadoPor: 'Dr. Carlos Ramírez',
  },
  {
    id: '5',
    tipo: 'Permiso Personal',
    fechaInicio: '25/10/2025',
    fechaFin: '26/10/2025',
    motivo: 'Viaje familiar',
    estado: 'aprobado',
    fechaSolicitud: '15/10/2025',
    fechaRespuesta: '16/10/2025',
    aprobadoPor: 'Dra. María López',
  },
];

export default function HistorialPermisoScreen() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const getEstadoIcon = (estado: string) => {
    return estado === 'aprobado' ? 'checkmark-circle' : 'close-circle';
  };

  const getEstadoColor = (estado: string) => {
    return estado === 'aprobado' ? '#48BB78' : '#F56565';
  };

  const getEstadoTexto = (estado: string) => {
    return estado === 'aprobado' ? 'Aprobado' : 'Rechazado';
  };

  const aprobados = HISTORIAL_PERMISOS.filter((p) => p.estado === 'aprobado').length;
  const rechazados = HISTORIAL_PERMISOS.filter((p) => p.estado === 'rechazado').length;

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
          <ThemedText style={styles.title}>Historial de Permisos</ThemedText>
        </View>
      </ImageBackground>

      {/* Contenido */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/* Estadísticas */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#E6FFEF' }]}>
                <Ionicons name="checkmark-circle" size={28} color="#48BB78" />
              </View>
              <ThemedText style={styles.statNumber}>{aprobados}</ThemedText>
              <ThemedText style={styles.statLabel}>Aprobados</ThemedText>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#FFE6E6' }]}>
                <Ionicons name="close-circle" size={28} color="#F56565" />
              </View>
              <ThemedText style={styles.statNumber}>{rechazados}</ThemedText>
              <ThemedText style={styles.statLabel}>Rechazados</ThemedText>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#E6F7FF' }]}>
                <Ionicons name="calendar" size={28} color="#6EADC4" />
              </View>
              <ThemedText style={styles.statNumber}>{HISTORIAL_PERMISOS.length}</ThemedText>
              <ThemedText style={styles.statLabel}>Total</ThemedText>
            </View>
          </View>

          {/* Lista de permisos */}
          <View style={styles.permisosContainer}>
            {HISTORIAL_PERMISOS.map((permiso) => (
              <View key={permiso.id} style={styles.permisoCard}>
                <View style={styles.permisoHeader}>
                  <View style={styles.permisoTitleContainer}>
                    <Ionicons name="document-text" size={20} color="#6EADC4" />
                    <ThemedText style={styles.permisoTipo}>{permiso.tipo}</ThemedText>
                  </View>
                  <View style={styles.estadoContainer}>
                    <Ionicons
                      name={getEstadoIcon(permiso.estado)}
                      size={24}
                      color={getEstadoColor(permiso.estado)}
                    />
                    <ThemedText
                      style={[styles.estadoTexto, { color: getEstadoColor(permiso.estado) }]}
                    >
                      {getEstadoTexto(permiso.estado)}
                    </ThemedText>
                  </View>
                </View>

                <View style={styles.permisoBody}>
                  <View style={styles.permisoRow}>
                    <Ionicons name="calendar-outline" size={16} color="#718096" />
                    <ThemedText style={styles.permisoInfo}>
                      {permiso.fechaInicio} - {permiso.fechaFin}
                    </ThemedText>
                  </View>

                  <View style={styles.permisoRow}>
                    <Ionicons name="chatbox-ellipses-outline" size={16} color="#718096" />
                    <ThemedText style={styles.permisoMotivo}>{permiso.motivo}</ThemedText>
                  </View>

                  {permiso.estado === 'rechazado' && permiso.motivoRechazo && (
                    <View style={styles.rechazoCard}>
                      <Ionicons name="alert-circle" size={16} color="#F56565" />
                      <ThemedText style={styles.rechazoTexto}>{permiso.motivoRechazo}</ThemedText>
                    </View>
                  )}

                  <View style={styles.divider} />

                  <View style={styles.permisoFooter}>
                    <View style={styles.footerColumn}>
                      <ThemedText style={styles.footerLabel}>Revisado por:</ThemedText>
                      <ThemedText style={styles.footerValue}>{permiso.aprobadoPor}</ThemedText>
                    </View>
                    <View style={styles.footerColumn}>
                      <ThemedText style={styles.footerLabel}>Fecha respuesta:</ThemedText>
                      <ThemedText style={styles.footerValue}>{permiso.fechaRespuesta}</ThemedText>
                    </View>
                  </View>
                </View>
              </View>
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
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  statLabel: {
    fontSize: 12,
    color: '#718096',
  },
  permisosContainer: {
    gap: 16,
  },
  permisoCard: {
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
  permisoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F7FAFC',
  },
  permisoTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  permisoTipo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  estadoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  estadoTexto: {
    fontSize: 14,
    fontWeight: '600',
  },
  permisoBody: {
    padding: 16,
    gap: 12,
  },
  permisoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  permisoInfo: {
    fontSize: 14,
    color: '#4A5568',
  },
  permisoMotivo: {
    flex: 1,
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
  },
  rechazoCard: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#FFF5F5',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#F56565',
  },
  rechazoTexto: {
    flex: 1,
    fontSize: 13,
    color: '#C53030',
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 4,
  },
  permisoFooter: {
    flexDirection: 'row',
    gap: 16,
  },
  footerColumn: {
    flex: 1,
  },
  footerLabel: {
    fontSize: 12,
    color: '#A0AEC0',
    marginBottom: 2,
  },
  footerValue: {
    fontSize: 13,
    color: '#4A5568',
    fontWeight: '500',
  },
});