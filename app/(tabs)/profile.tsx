import { StyleSheet, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const handleBack = () => {
    router.back();
  };

  const handlePerfil = () => {
    router.push('/perfil-detalle' as any);
  };

  const handleAjustes = () => {
    router.push('/ajustes' as any);
  };

  const handleMaterias = () => {
    router.back(); // Volver a la pantalla principal donde están las materias
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header con información del usuario */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <ThemedText style={styles.avatarText}>
              {user?.name?.charAt(0) || 'U'}
            </ThemedText>
          </View>
        </View>

        <ThemedText style={styles.userName}>{user?.name || 'Usuario'}</ThemedText>
        <ThemedText style={styles.userCareer}>
          {user?.role === 'estudiante' ? 'Ingeniería de Sistemas' : 'Profesor'}
        </ThemedText>
        <ThemedText style={styles.userId}>ID: 202210345</ThemedText>
      </View>

      {/* Opciones del menú */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={handlePerfil} activeOpacity={0.7}>
          <Ionicons name="person-outline" size={24} color="#4A5568" />
          <ThemedText style={styles.menuText}>Perfil</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleAjustes} activeOpacity={0.7}>
          <Ionicons name="settings-outline" size={24} color="#4A5568" />
          <ThemedText style={styles.menuText}>Ajustes</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleMaterias} activeOpacity={0.7}>
          <Ionicons name="layers-outline" size={24} color="#4A5568" />
          <ThemedText style={styles.menuText}>Materias</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleLogout} activeOpacity={0.7}>
          <Ionicons name="log-out-outline" size={24} color="#4A5568" />
          <ThemedText style={styles.menuText}>Cerrar sesión</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Footer con imagen de fondo y logo */}
      <ImageBackground
        source={require('@/assets/images/fondo-app.png')}
        style={styles.footer}
        resizeMode="cover"
      >
        <View style={styles.footerContent}>
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/safiro-logo.png')}
              style={styles.logo}
              contentFit="contain"
            />
          </View>
          <ThemedText style={styles.universityText}>Universidad Safiro</ThemedText>
          <ThemedText style={styles.copyrightText}>
            © 2025 - Todos los derechos reservados
          </ThemedText>
          <ThemedText style={styles.websiteText}>www.safiro.edu</ThemedText>
        </View>
      </ImageBackground>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A202C',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: '#1A202C',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ED8A7A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  userCareer: {
    fontSize: 16,
    color: '#A0AEC0',
    marginBottom: 4,
  },
  userId: {
    fontSize: 14,
    color: '#A0AEC0',
  },
  menuContainer: {
    flex: 1,
    backgroundColor: '#1A202C',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D3748',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  menuText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 16,
    fontWeight: '500',
  },
  footer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  footerContent: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  universityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  copyrightText: {
    fontSize: 12,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  websiteText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
});