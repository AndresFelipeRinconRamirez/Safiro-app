import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Text } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) =>
            Platform.OS === 'ios' ? (
              <Text style={{ fontSize: 28, color }}>🏠</Text>
            ) : (
              <Text style={{ fontSize: 24, color }}>🏠</Text>
            ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: null, // Ocultar de la barra de navegación
        }}
      />
      <Tabs.Screen
        name="permisos"
        options={{
          href: null, // Ocultar de la barra de navegación
        }}
      />
      <Tabs.Screen
        name="clases"
        options={{
          href: null, // Ocultar de la barra de navegación
        }}
      />
      <Tabs.Screen
        name="ayuda"
        options={{
          href: null, // Ocultar de la barra de navegación
        }}
      />
      <Tabs.Screen
        name="perfil-detalle"
        options={{
          href: null, // Ocultar de la barra de navegación
        }}
      />
      <Tabs.Screen
        name="ajustes"
        options={{
          href: null, // Ocultar de la barra de navegación
        }}
      />
    </Tabs>
  );
}
