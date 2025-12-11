import { StyleSheet, View, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Datos mock de las clases del profesor
const CLASES_DATA = {
  '1': {
    nombre: 'Ecuaciones diferenciales',
    totalEstudiantes: 28,
    aprobados: 22,
    reprobados: 6,
    promedioGeneral: 3.8,
    estudiantes: [
      { id: 1, nombre: 'Ana García', nota: 4.2, estado: 'aprobado' },
      { id: 2, nombre: 'Carlos Pérez', nota: 3.5, estado: 'aprobado' },
      { id: 3, nombre: 'Diana Rodríguez', nota: 2.8, estado: 'reprobado' },
      { id: 4, nombre: 'Eduardo López', nota: 4.0, estado: 'aprobado' },
      { id: 5, nombre: 'Fernanda Cruz', nota: 3.7, estado: 'aprobado' },
      { id: 6, nombre: 'Gabriel Silva', nota: 2.5, estado: 'reprobado' },
      { id: 7, nombre: 'Helena Martínez', nota: 4.5, estado: 'aprobado' },
      { id: 8, nombre: 'Ignacio Torres', nota: 3.9, estado: 'aprobado' },
    ],
  },
  '2': {
    nombre: 'Ecuaciones integrales',
    totalEstudiantes: 32,
    aprobados: 28,
    reprobados: 4,
    promedioGeneral: 4.1,
    estudiantes: [
      { id: 1, nombre: 'Julia Ramírez', nota: 4.3, estado: 'aprobado' },
      { id: 2, nombre: 'Kevin Mendoza', nota: 4.0, estado: 'aprobado' },
      { id: 3, nombre: 'Laura Gómez', nota: 2.9, estado: 'reprobado' },
      { id: 4, nombre: 'Mario Castro', nota: 4.2, estado: 'aprobado' },
      { id: 5, nombre: 'Natalia Vargas', nota: 4.5, estado: 'aprobado' },
      { id: 6, nombre: 'Oscar Reyes', nota: 3.8, estado: 'aprobado' },
      { id: 7, nombre: 'Patricia Díaz', nota: 4.1, estado: 'aprobado' },
      { id: 8, nombre: 'Ricardo Morales', nota: 2.7, estado: 'reprobado' },
    ],
  },
  '3': {
    nombre: 'Algebra Lineal',
    totalEstudiantes: 25,
    aprobados: 20,
    reprobados: 5,
    promedioGeneral: 3.9,
    estudiantes: [
      { id: 1, nombre: 'Sara Ortiz', nota: 4.0, estado: 'aprobado' },
      { id: 2, nombre: 'Tomás Ruiz', nota: 3.6, estado: 'aprobado' },
      { id: 3, nombre: 'Valentina Herrera', nota: 2.6, estado: 'reprobado' },
      { id: 4, nombre: 'Walter Campos', nota: 4.3, estado: 'aprobado' },
      { id: 5, nombre: 'Ximena Rojas', nota: 4.1, estado: 'aprobado' },
      { id: 6, nombre: 'Yolanda Soto', nota: 3.5, estado: 'aprobado' },
      { id: 7, nombre: 'Zacarías Flores', nota: 2.8, estado: 'reprobado' },
      { id: 8, nombre: 'Andrea Vega', nota: 4.4, estado: 'aprobado' },
    ],
  },
};

export default function ClaseDetalleScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const clase = CLASES_DATA[id as keyof typeof CLASES_DATA];

  const handleBack = () => {
    router.back();
  };

  const handleEditarNotas = () => {
    router.push(`/editar-clase/${id}` as any);
  };

  if (!clase) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Clase no encontrada</ThemedText>
      </ThemedView>
    );
  }

  const porcentajeAprobados = ((clase.aprobados / clase.totalEstudiantes) * 100).toFixed(1);
  const porcentajeReprobados = ((clase.reprobados / clase.totalEstudiantes) * 100).toFixed(1);

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
          <ThemedText style={styles.title}>{clase.nombre}</ThemedText>
        </View>
      </ImageBackground>

      {/* Contenido */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/* Estadísticas generales */}
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="people" size={32} color="#6EADC4" />
              <ThemedText style={styles.statNumber}>{clase.totalEstudiantes}</ThemedText>
              <ThemedText style={styles.statLabel}>Estudiantes</ThemedText>
            </View>

            <View style={[styles.statCard, styles.statAprobado]}>
              <Ionicons name="checkmark-circle" size={32} color="#48BB78" />
              <ThemedText style={styles.statNumber}>{clase.aprobados}</ThemedText>
              <ThemedText style={styles.statLabel}>Aprobados</ThemedText>
              <ThemedText style={styles.statPercentage}>{porcentajeAprobados}%</ThemedText>
            </View>

            <View style={[styles.statCard, styles.statReprobado]}>
              <Ionicons name="close-circle" size={32} color="#F56565" />
              <ThemedText style={styles.statNumber}>{clase.reprobados}</ThemedText>
              <ThemedText style={styles.statLabel}>Reprobados</ThemedText>
              <ThemedText style={styles.statPercentage}>{porcentajeReprobados}%</ThemedText>
            </View>
          </View>

          {/* Promedio general */}
          <View style={styles.promedioCard}>
            <View style={styles.promedioContent}>
              <View>
                <ThemedText style={styles.promedioLabel}>Promedio General</ThemedText>
                <ThemedText style={styles.promedioSubtext}>de la clase</ThemedText>
              </View>
              <ThemedText style={styles.promedioValor}>{clase.promedioGeneral.toFixed(2)}</ThemedText>
            </View>
          </View>

          {/* Lista de estudiantes */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Lista de Estudiantes</ThemedText>
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
                    <ThemedText style={styles.estudianteEstado}>
                      {estudiante.estado === 'aprobado' ? '✓ Aprobado' : '✗ Reprobado'}
                    </ThemedText>
                  </View>
                </View>
                <View
                  style={[
                    styles.notaBadge,
                    estudiante.estado === 'aprobado' ? styles.notaAprobado : styles.notaReprobado,
                  ]}
                >
                  <ThemedText style={styles.notaTexto}>{estudiante.nota.toFixed(1)}</ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Botón flotante para editar notas */}
      <TouchableOpacity style={styles.floatingButton} onPress={handleEditarNotas} activeOpacity={0.8}>
        <View style={styles.floatingButtonContent}>
          <View style={styles.iconCircle}>
            <Ionicons name="create-outline" size={24} color="#FFFFFF" />
          </View>
          <ThemedText style={styles.floatingButtonText}>Editar notas</ThemedText>
        </View>
      </TouchableOpacity>
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
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
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
  statAprobado: {
    borderLeftWidth: 4,
    borderLeftColor: '#48BB78',
  },
  statReprobado: {
    borderLeftWidth: 4,
    borderLeftColor: '#F56565',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#718096',
    marginTop: 4,
  },
  statPercentage: {
    fontSize: 11,
    color: '#A0AEC0',
    marginTop: 2,
  },
  promedioCard: {
    backgroundColor: '#6EADC4',
    borderRadius: 12,
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
  promedioContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promedioLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  promedioSubtext: {
    fontSize: 14,
    color: '#E6F3F7',
    marginTop: 2,
  },
  promedioValor: {
    fontSize: 36,
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
  estudianteEstado: {
    fontSize: 13,
    color: '#718096',
    marginTop: 2,
  },
  notaBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  notaAprobado: {
    backgroundColor: '#C6F6D5',
  },
  notaReprobado: {
    backgroundColor: '#FED7D7',
  },
  notaTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  floatingButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F7D94C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    flex: 1,
  },
});