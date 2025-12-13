/**
 * Configuración de variables de entorno
 */

// URL base del API de Safiro
// En desarrollo, usa la IP de tu máquina local en lugar de localhost
// para que funcione en dispositivos móviles
export const API_BASE_URL = __DEV__
  ? 'http://localhost:8080/api/v1'
  : 'https://api.safiro.com/api/v1'; // Cambiar en producción

// Timeout para las peticiones HTTP (en milisegundos)
export const API_TIMEOUT = 10000;

// Versión de la API
export const API_VERSION = 'v1';
