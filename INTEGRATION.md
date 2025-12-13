# Integración con Safiro API

Este documento explica cómo está configurada la integración entre Safiro-app y Safiro-API.

## 📋 Arquitectura

```
Safiro-app (React Native/Expo)
    ↓
services/api.ts (Cliente HTTP con Axios)
    ↓
services/auth-service.ts (Lógica de autenticación)
    ↓
Safiro-API (Spring Boot - Puerto 8080)
```

## 🔧 Configuración

### 1. Variables de Entorno

El archivo `config/env.ts` contiene la configuración del API:

```typescript
export const API_BASE_URL = __DEV__
  ? 'http://localhost:8080/api/v1'
  : 'https://api.safiro.com/api/v1';
```

**Importante:**
- En desarrollo usa `localhost:8080`
- Si pruebas en un dispositivo móvil físico, necesitas cambiar `localhost` por la IP local de tu máquina
- Ejemplo: `http://192.168.1.100:8080/api/v1`

### 2. Levantar el API de Safiro

Antes de usar la app, asegúrate de que el API esté corriendo:

```bash
cd ../Safiro-API/safiro
./mvnw spring-boot:run
```

El API debería estar disponible en: `http://localhost:8080`

### 3. Verificar Conexión

Puedes verificar que el API esté funcionando accediendo a:
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- Health check: `http://localhost:8080/actuator/health` (si está habilitado)

## 📁 Estructura de Archivos

```
Safiro-app/
├── config/
│   └── env.ts                    # Configuración de variables de entorno
├── services/
│   ├── api.ts                    # Cliente HTTP (Axios)
│   └── auth-service.ts           # Servicio de autenticación
├── contexts/
│   └── auth-context.tsx          # Context de autenticación
└── app/
    ├── login.tsx                 # Pantalla de login
    └── register.tsx              # Pantalla de registro
```

## 🔐 Autenticación

### Estado Actual

**Login:**
- Endpoint: `GET /api/v1/usuarios/email/{email}`
- Valida que el usuario exista, esté activo y tenga email verificado
- **Nota:** No valida contraseña (pendiente implementación JWT en backend)

**Registro:**
- Endpoint: `POST /api/v1/usuarios/registrar`
- Crea un nuevo usuario con tipo de perfil "Estudiante" por defecto
- Campos requeridos: nombre, email, telefono, password

### Tipos de Usuario

```typescript
export enum TipoPerfil {
  ESTUDIANTE = 1,
  PROFESOR = 2,
  ADMINISTRADOR = 3,
}
```

## 🚀 Próximos Pasos

### Implementación de JWT

Cuando el backend implemente autenticación JWT, necesitarás:

1. **Actualizar `auth-service.ts`:**
   - Cambiar el método `login()` para usar endpoint `/auth/login`
   - Guardar el token JWT recibido

2. **Actualizar `api.ts`:**
   - Descomentar el interceptor de requests
   - Agregar el token en el header `Authorization: Bearer {token}`

3. **Implementar almacenamiento persistente:**
   - Usar `AsyncStorage` o `SecureStore` de Expo para guardar el token
   - Restaurar sesión al iniciar la app

### Ejemplo de implementación con JWT:

```typescript
// services/auth-service.ts
async login(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/auth/login', credentials);

  // Guardar token
  await SecureStore.setItemAsync('auth_token', response.token);

  return response;
}

// services/api.ts
apiClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 🐛 Manejo de Errores

La aplicación maneja los siguientes tipos de errores:

- **404:** Usuario no encontrado
- **401:** Credenciales incorrectas
- **409:** Email ya registrado
- **Network Error:** Sin conexión al servidor
- **Timeout:** Servidor no responde (10 segundos)

## 📱 Probar en Dispositivo Físico

Si estás probando en un dispositivo móvil conectado a la misma red:

1. Obtén la IP local de tu máquina:
   ```bash
   # Windows
   ipconfig

   # Linux/Mac
   ifconfig
   ```

2. Actualiza `config/env.ts`:
   ```typescript
   export const API_BASE_URL = __DEV__
     ? 'http://192.168.1.XXX:8080/api/v1'  // Tu IP local
     : 'https://api.safiro.com/api/v1';
   ```

3. Reinicia el servidor de Expo

## 📚 Endpoints Utilizados

### Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/usuarios/registrar` | Registrar nuevo usuario |
| GET | `/usuarios/email/{email}` | Buscar usuario por email |
| GET | `/usuarios/{id}` | Obtener usuario por ID |
| PUT | `/usuarios/{id}/perfil` | Actualizar perfil |
| PUT | `/usuarios/{id}/password` | Cambiar contraseña |

## 🔍 Debug

Para ver las peticiones HTTP en la consola:

```bash
# Terminal de Expo
npm start
# Presiona 'j' para abrir el debugger de React Native
```

Los logs de errores se muestran en:
- Console del navegador (si usas web)
- React Native Debugger
- Terminal de Metro Bundler

## 📝 Notas Importantes

1. **Seguridad:** Actualmente el API tiene todos los endpoints abiertos (`permitAll`). En producción deberás implementar seguridad adecuada.

2. **Validación de Contraseña:** El login actual NO valida la contraseña. Solo verifica que el usuario exista.

3. **CORS:** Asegúrate de que el backend permita requests desde el origen de tu app.

4. **HTTPS:** En producción, SIEMPRE usa HTTPS para comunicarte con el API.
