import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleResetPassword = () => {
    // Aquí iría la lógica de recuperación de contraseña
    console.log('Solicitando recuperación de contraseña para:', email);
  };

  const handleBackToLogin = () => {
    router.back();
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

          <ThemedText style={styles.title}>Recuperar contraseña</ThemedText>
          <ThemedText style={styles.description}>
            Ingresa tu correo electrónico y te enviaremos instrucciones para
            restablecer tu contraseña.
          </ThemedText>

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

            {/* Botón de enviar */}
            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleResetPassword}
            >
              <ThemedText style={styles.resetButtonText}>
                Enviar instrucciones
              </ThemedText>
            </TouchableOpacity>

            {/* Enlace de volver a login */}
            <TouchableOpacity
              onPress={handleBackToLogin}
              style={styles.backButton}
            >
              <ThemedText style={styles.backButtonText}>
                Volver al inicio de sesión
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
    marginBottom: 40,
  },
  logoBox: {
    backgroundColor: '#E5F0F5',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 140,
  },
  logo: {
    width: 90,
    height: 90,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#2B7A94',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
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
  resetButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B7A94',
  },
  backButton: {
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 14,
    color: '#2B7A94',
    textDecorationLine: 'underline',
  },
});
