import { StyleSheet, View, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Datos mock de clases asignadas al profesor
const CLASES_ASIGNADAS = [
  { id: 1, nombre: 'Ecuaciones diferenciales' },
  { id: 2, nombre: 'Ecuaciones integrales' },
  { id: 3, nombre: 'Algebra Lineal' },
];

export default function ClasesScreen() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleClasePress = (clase: typeof CLASES_ASIGNADAS[0]) => {
    // Navegar al detalle de la clase
    router.push(`/clase/${clase.id}` as any);
  };

  const handleEditarClases = () => {
    // Mostrar un menú para seleccionar qué clase editar
    // Por ahora, navegamos a editar la primera clase
    router.push('/editar-clase/1' as any);
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
          <ThemedText style={styles.title}>Clases asignadas</ThemedText>
        </View>
      </ImageBackground>

      {/* Contenido */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.clasesContainer}>
          {CLASES_ASIGNADAS.map((clase) => (
            <TouchableOpacity
              key={clase.id}
              style={styles.claseCard}
              onPress={() => handleClasePress(clase)}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.claseText}>{clase.nombre}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Botón flotante para editar clases */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleEditarClases}
        activeOpacity={0.8}
      >
        <View style={styles.floatingButtonContent}>
          <View style={styles.iconCircle}>
            <Ionicons name="create-outline" size={24} color="#FFFFFF" />
          </View>
          <ThemedText style={styles.floatingButtonText}>Editar clases</ThemedText>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  clasesContainer: {
    padding: 20,
    gap: 16,
  },
  claseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    minHeight: 80,
    justifyContent: 'center',
  },
  claseText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A5568',
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