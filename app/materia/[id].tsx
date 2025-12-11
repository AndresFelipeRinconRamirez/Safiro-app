import { StyleSheet, View, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Datos mock de las materias
const MATERIAS_DATA = {
  '1': {
    nombre: 'Ecuaciones Diferenciales',
    descripcion: 'Esta materia aborda el estudio de las ecuaciones diferenciales ordinarias y parciales, sus métodos de solución y aplicaciones en física, ingeniería y otras ciencias. Se exploran conceptos como transformadas de Laplace, series de Fourier y métodos numéricos.',
    notas: [
      { tipo: 'Parcial 1', nota: 4.2, porcentaje: '30%' },
      { tipo: 'Parcial 2', nota: 4.5, porcentaje: '30%' },
      { tipo: 'Trabajos', nota: 4.0, porcentaje: '20%' },
      { tipo: 'Final', nota: 4.3, porcentaje: '20%' },
    ],
    promedio: 4.25,
  },
  '2': {
    nombre: 'Catedra',
    descripcion: 'Cátedra institucional que explora la historia, valores y misión de la universidad. Se analizan temas relacionados con la ética profesional, responsabilidad social y desarrollo del pensamiento crítico en el contexto académico y profesional.',
    notas: [
      { tipo: 'Ensayo 1', nota: 4.5, porcentaje: '25%' },
      { tipo: 'Presentación', nota: 4.8, porcentaje: '25%' },
      { tipo: 'Participación', nota: 4.6, porcentaje: '25%' },
      { tipo: 'Proyecto Final', nota: 4.7, porcentaje: '25%' },
    ],
    promedio: 4.65,
  },
  '3': {
    nombre: 'Programación avanzada',
    descripcion: 'Curso avanzado de programación que cubre patrones de diseño, arquitecturas de software, estructuras de datos complejas y algoritmos eficientes. Se trabaja con paradigmas orientados a objetos, funcional y se introducen conceptos de programación concurrente.',
    notas: [
      { tipo: 'Proyecto 1', nota: 4.6, porcentaje: '25%' },
      { tipo: 'Proyecto 2', nota: 4.4, porcentaje: '25%' },
      { tipo: 'Examen', nota: 4.2, porcentaje: '30%' },
      { tipo: 'Laboratorios', nota: 4.8, porcentaje: '20%' },
    ],
    promedio: 4.48,
  },
  '4': {
    nombre: 'Ingles I',
    descripcion: 'Curso introductorio de inglés enfocado en el desarrollo de habilidades básicas de comunicación oral y escrita. Se trabajan aspectos gramaticales fundamentales, vocabulario esencial y comprensión de lectura básica.',
    notas: [
      { tipo: 'Oral', nota: 4.0, porcentaje: '25%' },
      { tipo: 'Escrito', nota: 4.3, porcentaje: '25%' },
      { tipo: 'Comprensión', nota: 4.2, porcentaje: '25%' },
      { tipo: 'Participación', nota: 4.5, porcentaje: '25%' },
    ],
    promedio: 4.25,
  },
  '5': {
    nombre: 'Emprendimiento',
    descripcion: 'Materia orientada al desarrollo de habilidades emprendedoras y empresariales. Se estudian modelos de negocio, planes de empresa, estrategias de marketing y finanzas básicas. Los estudiantes desarrollan proyectos emprendedores reales.',
    notas: [
      { tipo: 'Plan de negocio', nota: 4.7, porcentaje: '35%' },
      { tipo: 'Pitch', nota: 4.5, porcentaje: '25%' },
      { tipo: 'Análisis de mercado', nota: 4.3, porcentaje: '20%' },
      { tipo: 'Participación', nota: 4.6, porcentaje: '20%' },
    ],
    promedio: 4.55,
  },
};

export default function MateriaScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const materia = MATERIAS_DATA[id as keyof typeof MATERIAS_DATA];

  const handleBack = () => {
    router.back();
  };

  if (!materia) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Materia no encontrada</ThemedText>
      </ThemedView>
    );
  }

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
          <ThemedText style={styles.title}>{materia.nombre}</ThemedText>
        </View>
      </ImageBackground>

      {/* Contenido */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/* Descripción de la materia */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Descripción</ThemedText>
            <View style={styles.card}>
              <ThemedText style={styles.description}>{materia.descripcion}</ThemedText>
            </View>
          </View>

          {/* Notas */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Notas</ThemedText>
            {materia.notas.map((nota, index) => (
              <View key={index} style={styles.notaCard}>
                <View style={styles.notaInfo}>
                  <ThemedText style={styles.notaTipo}>{nota.tipo}</ThemedText>
                  <ThemedText style={styles.notaPorcentaje}>{nota.porcentaje}</ThemedText>
                </View>
                <View style={styles.notaValor}>
                  <ThemedText style={styles.notaNumero}>{nota.nota.toFixed(1)}</ThemedText>
                </View>
              </View>
            ))}

            {/* Promedio */}
            <View style={styles.promedioCard}>
              <ThemedText style={styles.promedioLabel}>Promedio Final</ThemedText>
              <ThemedText style={styles.promedioValor}>{materia.promedio.toFixed(2)}</ThemedText>
            </View>
          </View>
        </View>
      </ScrollView>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  description: {
    fontSize: 15,
    color: '#4A5568',
    lineHeight: 22,
  },
  notaCard: {
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
  notaInfo: {
    flex: 1,
  },
  notaTipo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  notaPorcentaje: {
    fontSize: 14,
    color: '#718096',
  },
  notaValor: {
    backgroundColor: '#6EADC4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  notaNumero: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  promedioCard: {
    backgroundColor: '#6EADC4',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  promedioLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  promedioValor: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});