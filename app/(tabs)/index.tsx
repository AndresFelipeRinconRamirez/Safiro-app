import { StyleSheet, View, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'expo-router';

// Datos mock de materias para estudiantes
const MATERIAS_ESTUDIANTE = [
  { id: 1, nombre: 'Ecuaciones Diferenciales' },
  { id: 2, nombre: 'Catedra' },
  { id: 3, nombre: 'Programación avanzada' },
  { id: 4, nombre: 'Ingles I' },
  { id: 5, nombre: 'Emprendimiento' },
];

// Datos mock de secciones para profesores
const SECCIONES_PROFESOR = [
  {
    id: 1,
    nombre: 'Clases',
    descripcion: 'Ver y gestionar tus clases',
    imagen: require('@/assets/images/Rol-profe1.png')
  },
  {
    id: 2,
    nombre: 'Módulos de\npermisos',
    descripcion: 'Gestionar permisos y accesos',
    imagen: require('@/assets/images/Rol-profe2.png')
  },
];

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const handleMateriaPress = (materia: typeof MATERIAS_ESTUDIANTE[0]) => {
    // Navegar a la pantalla de la materia
    router.push(`/materia/${materia.id}` as any);
  };

  const handleHelpPress = () => {
    router.push('/ayuda' as any);
  };

  const handleSeccionPress = (seccion: typeof SECCIONES_PROFESOR[0]) => {
    // Navegar según la sección seleccionada
    if (seccion.id === 1) {
      // Clases
      router.push('/clases' as any);
    } else if (seccion.id === 2) {
      // Módulos de permisos
      router.push('/permisos' as any);
    } else {
      console.log('Sección seleccionada:', seccion.nombre);
    }
  };

  const handleAvatarPress = () => {
    router.push('/(tabs)/profile');
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
          <View>
            <ThemedText style={styles.greeting}>Bienvenido</ThemedText>
            <ThemedText style={styles.userName}>{user?.name || 'Estudiante'}</ThemedText>
          </View>
          <TouchableOpacity onPress={handleAvatarPress} activeOpacity={0.7}>
            <View style={styles.avatar}>
              <ThemedText style={styles.avatarText}>
                {user?.name?.charAt(0) || 'E'}
              </ThemedText>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Lista de materias o clases según el rol */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.materiasContainer}>
          {user?.role === 'estudiante' ? (
            // Vista para estudiantes - Materias
            <>
              {MATERIAS_ESTUDIANTE.map((materia) => (
                <TouchableOpacity
                  key={materia.id}
                  style={styles.materiaCard}
                  onPress={() => handleMateriaPress(materia)}
                  activeOpacity={0.7}
                >
                  <ThemedText style={styles.materiaText}>{materia.nombre}</ThemedText>
                </TouchableOpacity>
              ))}
            </>
          ) : (
            // Vista para profesores - Secciones con imágenes
            <>
              {SECCIONES_PROFESOR.map((seccion) => (
                <TouchableOpacity
                  key={seccion.id}
                  style={styles.seccionCard}
                  onPress={() => handleSeccionPress(seccion)}
                  activeOpacity={0.7}
                >
                  <View style={styles.seccionTextContainer}>
                    <ThemedText style={styles.seccionTitle}>{seccion.nombre}</ThemedText>
                  </View>
                  <Image
                    source={seccion.imagen}
                    style={styles.seccionImage}
                    contentFit="cover"
                  />
                </TouchableOpacity>
              ))}
            </>
          )}

          {/* Centro de ayuda */}
          <TouchableOpacity style={styles.helpCard} onPress={handleHelpPress} activeOpacity={0.7}>
            <View style={styles.helpIcon}>
              <ThemedText style={styles.helpIconText}>?</ThemedText>
            </View>
            <ThemedText style={styles.helpText}>Centro de ayuda</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Botón de cerrar sesión (temporal para testing) */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <ThemedText style={styles.logoutText}>Cerrar Sesión</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ED8A7A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  materiasContainer: {
    padding: 20,
  },
  materiaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  materiaText: {
    fontSize: 16,
    color: '#718096',
  },
  seccionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    height: 160,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  seccionTextContainer: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 16,
    zIndex: 1,
  },
  seccionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A5568',
  },
  seccionImage: {
    width: '50%',
    height: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  helpCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
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
  helpIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7D94C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  helpIconText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  helpText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    padding: 16,
    margin: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});