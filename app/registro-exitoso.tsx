import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RegistroExitosoScreen() {
  const router = useRouter();

  const handleIrAlInicio = () => {
    router.replace('/login');
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        {/* Logo de Safiro */}
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/safiro-logo.png')}
            style={styles.logo}
            contentFit="contain"
          />
        </View>

        {/* Ícono de éxito */}
        <View style={styles.successIconContainer}>
          <View style={styles.successCircle}>
            <Ionicons name="checkmark" size={80} color="#48BB78" />
          </View>
        </View>

        {/* Texto de confirmación */}
        <ThemedText style={styles.title}>Registro realizado</ThemedText>
        <ThemedText style={styles.subtitle}>con éxito</ThemedText>

        {/* Botón para ir al inicio */}
        <TouchableOpacity style={styles.button} onPress={handleIrAlInicio}>
          <ThemedText style={styles.buttonText}>Ir al inicio</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
  },
  successIconContainer: {
    marginBottom: 40,
  },
  successCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 8,
    borderColor: '#48BB78',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 60,
  },
  button: {
    backgroundColor: '#6EADC4',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});