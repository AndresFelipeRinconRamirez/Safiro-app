/**
 * Configuración de variables de entorno
 */

// IMPORTANTE: Para probar en dispositivo móvil o emulador Android,
// necesitas usar la IP de tu máquina en lugar de localhost.
//
// Para Android Emulator usa: 10.0.2.2:8080
// Para dispositivo físico usa tu IP local: 192.168.X.X:8080
// Para web/iOS Simulator puedes usar: localhost:8080

const getApiUrl = () => {
  if (!__DEV__) {
    return 'https://api.safiro.com/api/v1'; // Producción
  }

  // En desarrollo, determinar la URL según la plataforma
  // Si estás en web, usa localhost
  // Si estás en móvil, necesitas tu IP local o 10.0.2.2 para Android emulator

  // Opción 1: Para Android Emulator
  // return 'http://10.0.2.2:8080/api/v1';

  // Opción 2: Para web o iOS Simulator
  // return 'http://localhost:8080/api/v1';

  // Opción 3: Para dispositivo físico - IP local detectada
  return 'http://192.168.1.6:8080/api/v1';
};

export const API_BASE_URL = getApiUrl();

// Timeout para las peticiones HTTP (en milisegundos)
export const API_TIMEOUT = 10000;

// Versión de la API
export const API_VERSION = 'v1';
