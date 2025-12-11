import { StyleSheet, View, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PermisosScreen() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleSolicitudPermiso = () => {
    router.push('/solicitudes-permiso' as any);
  };

  const handleHistorialPermiso = () => {
    router.push('/historial-permiso' as any);
  };

  const handleNuevoPermiso = () => {
    router.push('/solicitar-permiso' as any);
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
          <ThemedText style={styles.title}>Modulo{'\n'}Permisos</ThemedText>
        </View>
      </ImageBackground>

      {/* Contenido */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.optionsContainer}>
          {/* Solicitud de permiso con imagen */}
          <TouchableOpacity
            style={styles.optionCardWithImage}
            onPress={handleSolicitudPermiso}
            activeOpacity={0.7}
          >
            <View style={styles.optionTextContainer}>
              <ThemedText style={styles.optionText}>Solicitud de{'\n'}permiso</ThemedText>
            </View>
            <Image
              source={require('@/assets/images/Permisos.png')}
              style={styles.optionImage}
              contentFit="cover"
            />
          </TouchableOpacity>

          {/* Historial de permiso con imagen */}
          <TouchableOpacity
            style={styles.optionCardWithImage}
            onPress={handleHistorialPermiso}
            activeOpacity={0.7}
          >
            <View style={styles.optionTextContainer}>
              <ThemedText style={styles.optionText}>Historial de{'\n'}permiso</ThemedText>
            </View>
            <Image
              source={require('@/assets/images/Permisos.png')}
              style={styles.optionImage}
              contentFit="cover"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Botón flotante para solicitar nuevo permiso */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleNuevoPermiso}
        activeOpacity={0.8}
      >
        <View style={styles.floatingButtonContent}>
          <View style={styles.iconCircle}>
            <Ionicons name="create-outline" size={24} color="#FFFFFF" />
          </View>
          <ThemedText style={styles.floatingButtonText}>Solicitar nuevo permiso</ThemedText>
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
    lineHeight: 38,
  },
  content: {
    flex: 1,
  },
  optionsContainer: {
    padding: 20,
    gap: 16,
  },
  optionCard: {
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
    minHeight: 120,
    justifyContent: 'center',
  },
  optionCardWithImage: {
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
    height: 140,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  optionTextContainer: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 16,
    zIndex: 1,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A5568',
    lineHeight: 24,
  },
  optionImage: {
    width: '50%',
    height: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
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