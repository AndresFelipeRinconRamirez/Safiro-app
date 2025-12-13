import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/auth-context';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa tu correo y contraseña');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      // Navegar a la pantalla principal
      router.replace('/(tabs)');
    } catch (error: any) {
      console.error('Error en login:', error);

      let errorMessage = 'Ocurrió un error al iniciar sesión';

      if (error.response) {
        // El servidor respondió con un error
        if (error.response.status === 404) {
          errorMessage = 'Usuario no encontrado. Verifica tu correo electrónico.';
        } else if (error.response.status === 401) {
          errorMessage = 'Credenciales incorrectas.';
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.request) {
        // No hubo respuesta del servidor
        errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert('Error de autenticación', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    // Navegar a la pantalla de registro
    router.push('/register');
  };

  const handleForgotPassword = () => {
    // Navegar a la pantalla de recuperación de contraseña
    router.push('/forgot-password');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logoBox}>
              <Image
                source={require('@/assets/images/safiro-logo.png')}
                style={styles.logo}
                contentFit="contain"
              />
            </View>
          </View>

          {/* Formulario */}
          <View style={styles.formContainer}>
            {/* Campo de correo */}
            <TextInput
              style={styles.input}
              placeholder="Correo"
              placeholderTextColor="#7FA9B8"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />

            {/* Campo de contraseña */}
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#7FA9B8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
            />

            {/* Botón de iniciar sesión */}
            <TouchableOpacity
              style={[styles.loginButton, loading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#2B7A94" />
              ) : (
                <ThemedText style={styles.loginButtonText}>
                  Iniciar sesión
                </ThemedText>
              )}
            </TouchableOpacity>

            {/* Enlace de registro */}
            <View style={styles.registerContainer}>
              <ThemedText style={styles.registerText}>
                ¿Aun no tienes cuenta?{' '}
              </ThemedText>
              <TouchableOpacity onPress={handleRegister}>
                <ThemedText style={styles.registerLink}>Regístrate</ThemedText>
              </TouchableOpacity>
            </View>

            {/* Enlace de olvidaste tu contraseña */}
            <TouchableOpacity onPress={handleForgotPassword}>
              <ThemedText style={styles.forgotPasswordText}>
                ¿Olvidaste tu contraseña?
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6EADC4',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoBox: {
    backgroundColor: '#E5F0F5',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: 160,
  },
  logo: {
    width: 100,
    height: 100,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#B8D9E5',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    color: '#2B7A94',
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B7A94',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  registerText: {
    fontSize: 14,
    color: '#2B7A94',
  },
  registerLink: {
    fontSize: 14,
    color: '#2B7A94',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#2B7A94',
    textAlign: 'center',
  },
});
