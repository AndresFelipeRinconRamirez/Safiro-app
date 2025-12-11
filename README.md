# 📱 Safiro App - Sistema de Gestión Académica

Aplicación móvil desarrollada con React Native y Expo para la gestión académica de estudiantes y profesores.

## 🎯 Resumen del Proyecto

**Safiro** es una aplicación móvil multiplataforma (iOS y Android) que permite:

- **Para Estudiantes**: Ver materias, consultar notas, solicitar permisos y acceder a servicios académicos
- **Para Profesores**: Gestionar clases, editar notas de estudiantes y aprobar permisos

### Tecnologías Utilizadas

- **React Native** con **Expo** (Framework)
- **TypeScript** (Lenguaje)
- **Expo Router** (Navegación basada en archivos)
- **React Context API** (Gestión de estado)
- **Expo Image** (Optimización de imágenes)

---

## 🔐 Credenciales de Prueba (Mock)

Para probar la aplicación, se han creado **dos usuarios mock** que NO requieren backend:

### Usuario Estudiante
```
Email: estudiante@safiro.com
Contraseña: demo123
```

### Usuario Profesor
```
Email: profesor@safiro.com
Contraseña: demo123
```

**Ubicación del código mock**: `contexts/auth-context.tsx` (líneas 8-13)

```typescript
const MOCK_USERS: User[] = [
  { id: '1', name: 'Estudiante Demo', email: 'estudiante@safiro.com', role: 'estudiante' },
  { id: '2', name: 'Profesor Demo', email: 'profesor@safiro.com', role: 'profesor' },
];
```

---

## 📋 Resumen de Funcionalidades Implementadas

### ✅ Sistema de Autenticación
- Pantalla de login con validación
- Pantalla de registro con campos: nombre, email, teléfono, contraseña
- Recuperación de contraseña (UI creada, sin backend)
- Pantalla de confirmación de registro exitoso
- Persistencia de sesión mediante Context API

### ✅ Navegación por Roles
- **Rol Estudiante**: Acceso a materias, notas y servicios
- **Rol Profesor**: Acceso a clases, edición de notas y permisos
- Menú de perfil compartido con opciones personalizadas

### ✅ Módulos del Estudiante
1. **Pantalla de Inicio**: Servicios académicos (materias, permisos, centro de ayuda, configuración)
2. **Materias**: Lista de materias con detalles (código, créditos, profesor)
3. **Detalle de Materia**: Descripción, notas (parciales, quices, proyecto final)
4. **Permisos**: Opción para solicitar permisos académicos

### ✅ Módulos del Profesor
1. **Pantalla de Inicio**: Panel diferente con acceso a clases
2. **Clases**: Lista de clases asignadas
3. **Detalle de Clase**: Estadísticas (total estudiantes, aprobados, reprobados) y lista de estudiantes con notas
4. **Editar Notas**: Formulario para modificar notas individuales (validación 0.0-5.0)
5. **Módulo de Permisos**: Gestión de solicitudes y historial

### ✅ Módulos Compartidos
1. **Perfil**: Menú con avatar, nombre y opciones
2. **Perfil Detalle**: Información personal completa (nombre, email, carrera/departamento, ID)
3. **Ajustes**:
   - Notificaciones push (toggle)
   - Modo oscuro (toggle)
   - Cambiar contraseña
   - Cambiar correo
   - Términos y condiciones
   - Política de privacidad
   - Versión de la app (1.0.0)
4. **Centro de Ayuda**: Formulario de contacto con información de soporte

### ✅ Diseño Consistente
- Header con imagen de fondo (`fondo-app.png`) en todas las pantallas internas
- Paleta de colores: #6EADC4 (azul principal), #ED8A7A (coral), #FFFFFF (blanco)
- Tarjetas con sombras y bordes redondeados
- Iconos de Ionicons

---

## 🚀 Guía de Instalación y Ejecución

### Prerrequisitos

Asegúrate de tener instalado:

1. **Node.js** (versión 18 o superior)
   - Descarga desde: https://nodejs.org/

2. **npm** (se instala con Node.js)

3. **Expo Go** en tu dispositivo móvil
   - iOS: https://apps.apple.com/app/expo-go/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

4. **(Opcional)** Android Studio o Xcode para emuladores

### Pasos para Correr el Proyecto

#### 1. Clonar o Descargar el Proyecto

```bash
# Si está en un repositorio
git clone <URL_DEL_REPOSITORIO>
cd safiro-app

# O simplemente navega a la carpeta del proyecto
cd c:\Users\user\Documents\safiro-app
```

#### 2. Instalar Dependencias

```bash
npm install
```

Este comando instalará todas las librerías necesarias:
- expo
- expo-router
- react-native
- @expo/vector-icons
- Y todas las demás dependencias listadas en `package.json`

#### 3. Iniciar el Servidor de Desarrollo

```bash
npx expo start
```

O también puedes usar:
```bash
npm start
```

#### 4. Abrir la App en tu Dispositivo

Después de ejecutar `npx expo start`, verás un código QR en la terminal:

**En Android:**
1. Abre la app **Expo Go**
2. Toca "Scan QR code"
3. Escanea el código QR de la terminal

**En iOS:**
1. Abre la **Cámara** nativa del iPhone
2. Apunta al código QR
3. Toca la notificación que aparece para abrir en Expo Go

**En Emulador:**
- Presiona `a` para Android emulator
- Presiona `i` para iOS simulator (solo en Mac)

#### 5. Probar la App

Una vez que la app se abra, usa las credenciales mock:

```
Estudiante: estudiante@safiro.com / demo123
Profesor: profesor@safiro.com / demo123
```

---

## 📁 Estructura del Proyecto

```
safiro-app/
├── app/                          # Pantallas (Expo Router)
│   ├── (tabs)/                   # Navegación por pestañas
│   │   ├── _layout.tsx          # Configuración de tabs
│   │   ├── index.tsx            # Inicio (varía según rol)
│   │   ├── profile.tsx          # Menú de perfil
│   │   ├── perfil-detalle.tsx   # Detalles del usuario
│   │   ├── ajustes.tsx          # Configuración
│   │   ├── clases.tsx           # Clases (profesor)
│   │   ├── permisos.tsx         # Permisos (profesor)
│   │   └── ayuda.tsx            # Centro de ayuda
│   ├── clase/[id].tsx           # Detalle de clase (dinámico)
│   ├── editar-clase/[id].tsx    # Editar notas
│   ├── materia/[id].tsx         # Detalle de materia (dinámico)
│   ├── _layout.tsx              # Layout raíz con AuthProvider
│   ├── index.tsx                # Splash screen
│   ├── login.tsx                # Login
│   ├── register.tsx             # Registro
│   ├── forgot-password.tsx      # Recuperar contraseña
│   └── registro-exitoso.tsx     # Confirmación registro
├── components/                   # Componentes reutilizables
│   ├── themed-text.tsx          # Texto con tema
│   └── themed-view.tsx          # Vista con tema
├── contexts/                     # Estado global
│   └── auth-context.tsx         # ⚠️ Autenticación (MOCK)
├── constants/
│   └── theme.ts                 # Colores y temas
├── hooks/
│   └── use-color-scheme.tsx     # Hook para temas
├── assets/
│   └── images/                  # Imágenes (logos, fondos, etc.)
└── package.json                 # Dependencias
```

---

## 🔌 Integración con Backend (Guía para Desarrolladores)

### Puntos Críticos de Integración

#### 1. **Autenticación** (`contexts/auth-context.tsx`)

**Endpoints necesarios:**

```typescript
// Login
POST /auth/login
Body: { email: string, password: string }
Response: { id: string, name: string, email: string, role: 'estudiante' | 'profesor', token: string }

// Registro
POST /auth/register
Body: { name: string, email: string, phone: string, password: string }
Response: { success: boolean }

// Validar sesión
GET /auth/me
Headers: { Authorization: 'Bearer {token}' }
Response: { id: string, name: string, email: string, role: string }
```

**Cambios necesarios:**

Reemplazar la función `signIn` en `contexts/auth-context.tsx` (línea ~24):

```typescript
const signIn = async (email: string, password: string) => {
  try {
    const response = await fetch('TU_API_URL/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const user: User = {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
      };
      setUser(user);
      // Guardar token
      await AsyncStorage.setItem('authToken', data.token);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error en login:', error);
    return false;
  }
};
```

**Instalar dependencia:**
```bash
npm install @react-native-async-storage/async-storage
```

#### 2. **Materias** (`app/materia/[id].tsx`)

**Endpoint:**
```
GET /api/materias/:id
Headers: { Authorization: 'Bearer {token}' }
```

**Datos mock actuales** (líneas 14-88): Objeto `MATERIAS_DATA` con 5 materias

**Reemplazar con:**
```typescript
useEffect(() => {
  const fetchMateria = async () => {
    const token = await AsyncStorage.getItem('authToken');
    const response = await fetch(`TU_API_URL/api/materias/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const data = await response.json();
    setMateria(data);
  };
  fetchMateria();
}, [id]);
```

#### 3. **Clases** (`app/clase/[id].tsx`)

**Endpoint:**
```
GET /api/clases/:id
Headers: { Authorization: 'Bearer {token}' }
```

**Datos mock actuales** (líneas 16-110): Objeto `CLASES_DATA`

#### 4. **Editar Notas** (`app/editar-clase/[id].tsx`)

**Endpoint:**
```
PUT /api/clases/:id/notas
Body: { notas: Array<{ estudianteId: string, nota: number }> }
Headers: { Authorization: 'Bearer {token}' }
```

**Actualizar función `handleSave`** (línea 40)

#### 5. **Centro de Ayuda** (`app/(tabs)/ayuda.tsx`)

**Endpoint:**
```
POST /api/ayuda/contacto
Body: { asunto: string, mensaje: string }
Headers: { Authorization: 'Bearer {token}' }
```

### Resumen de Endpoints

| Archivo | Endpoint | Método | Estado |
|---------|----------|--------|--------|
| `contexts/auth-context.tsx` | `/auth/login` | POST | ⚠️ Mock |
| `contexts/auth-context.tsx` | `/auth/register` | POST | ⚠️ Mock |
| `contexts/auth-context.tsx` | `/auth/me` | GET | ⚠️ Mock |
| `app/materia/[id].tsx` | `/api/materias/:id` | GET | ⚠️ Mock |
| `app/clase/[id].tsx` | `/api/clases/:id` | GET | ⚠️ Mock |
| `app/editar-clase/[id].tsx` | `/api/clases/:id/notas` | PUT | ⚠️ Mock |
| `app/(tabs)/ayuda.tsx` | `/api/ayuda/contacto` | POST | ⚠️ Mock |

---

## 🛠️ Comandos Útiles

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start

# Limpiar caché de Expo
npx expo start --clear

# Ver en navegador web (si está configurado)
npx expo start --web

# Generar build para producción
npx expo build:android
npx expo build:ios
```

---

## 📝 Notas Importantes

1. **Datos Mock**: Todos los datos (usuarios, materias, clases) están hardcodeados en los archivos. Para producción, deben reemplazarse por llamadas al backend.

2. **Roles**: El sistema diferencia entre `estudiante` y `profesor` basándose en el campo `user.role` del contexto de autenticación.

3. **Navegación**: Se usa Expo Router con navegación basada en archivos. Cada archivo en `app/` es una ruta.

4. **Imágenes**: Todas las imágenes están en `assets/images/`. La imagen `fondo-app.png` se usa como header en la mayoría de pantallas.

5. **Sin Backend**: La app funciona completamente sin backend gracias a los datos mock. Ideal para desarrollo y testing.

---

## 🐛 Solución de Problemas

### El código QR no aparece
```bash
npx expo start --clear
```

### Error de dependencias
```bash
rm -rf node_modules package-lock.json
npm install
```

### La app no se actualiza
- Presiona `r` en la terminal para recargar
- O sacude el dispositivo y selecciona "Reload"

### Error en Windows con rutas
Asegúrate de estar en la carpeta correcta:
```bash
cd c:\Users\user\Documents\safiro-app
```

---

## 📧 Contacto y Soporte

Para dudas sobre el proyecto, contactar al equipo de desarrollo.

---

## 📄 Licencia

Este proyecto es privado y está bajo desarrollo.