import { ThemedText } from '@/components/themed-text';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleRegister = () => {
    // Navegar a la pantalla de registro exitoso
    router.push('/registro-exitoso' as any);
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

          <ThemedText style={styles.title}>Crear cuenta</ThemedText>

          {/* Formulario */}
          <View style={styles.formContainer}>
            {/* Campo de nombre */}
            <TextInput
              style={styles.input}
              placeholder="Nombre completo"
              placeholderTextColor="#7FA9B8"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoComplete="name"
            />

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

            {/* Campo de numero de celular */}
            <TextInput
              style={styles.input}
              placeholder="Numero telefonico"
              placeholderTextColor="#7FA9B8"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              autoComplete="tel"
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
              autoComplete="password-new"
            />

            {/* Campo de confirmar contraseña */}
            <TextInput
              style={styles.input}
              placeholder="Confirmar contraseña"
              placeholderTextColor="#7FA9B8"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password-new"
            />

            {/* Botón de registro */}
            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
            >
              <ThemedText style={styles.registerButtonText}>
                Registrarse
              </ThemedText>
            </TouchableOpacity>

            {/* Enlace de volver a login */}
            <View style={styles.loginContainer}>
              <ThemedText style={styles.loginText}>
                ¿Ya cuentas con una cuenta?{' '}
              </ThemedText>
              <TouchableOpacity onPress={handleBackToLogin}>
                <ThemedText style={styles.loginLink}>Inicia sesión</ThemedText>
              </TouchableOpacity>
            </View>
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
    paddingTop: 40,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoBox: {
    backgroundColor: '#E5F0F5',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
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
  registerButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B7A94',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#2B7A94',
  },
  loginLink: {
    fontSize: 14,
    color: '#2B7A94',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});
