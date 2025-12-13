import React, { createContext, useContext, useState, ReactNode } from 'react';
import authService, {
  UsuarioResponse,
  LoginCredentials,
  RegistroUsuarioRequest,
} from '@/services/auth-service';

export type UserRole = 'estudiante' | 'profesor' | 'asistente';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  telefono: string;
  emailVerificado: boolean;
  activo: boolean;
  idTipoPerfil: number;
  nombreTipoPerfil: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (datos: RegistroUsuarioRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Mapear rol de tipo perfil a nombre de rol
 * IMPORTANTE: IDs según la base de datos del backend
 */
function mapearRol(idTipoPerfil: number): UserRole {
  switch (idTipoPerfil) {
    case 1:
      return 'profesor';
    case 2:
      return 'asistente';
    case 3:
      return 'estudiante';
    default:
      return 'estudiante';
  }
}

/**
 * Convertir UsuarioResponse del API a User de la app
 */
function convertirUsuarioResponse(usuarioResponse: UsuarioResponse): User {
  // Concatenar nombre completo
  const nombreCompleto = [
    usuarioResponse.primerNombre,
    usuarioResponse.segundoNombre,
    usuarioResponse.primerApellido,
    usuarioResponse.segundoApellido,
  ]
    .filter(Boolean)
    .join(' ');

  return {
    id: usuarioResponse.idUsuario,
    name: nombreCompleto,
    email: usuarioResponse.email,
    telefono: usuarioResponse.telefono || '',
    emailVerificado: usuarioResponse.verificado,
    activo: usuarioResponse.activo,
    idTipoPerfil: usuarioResponse.tipoPerfil.idTipoPerfil,
    nombreTipoPerfil: usuarioResponse.tipoPerfil.nombre,
    role: mapearRol(usuarioResponse.tipoPerfil.idTipoPerfil),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      const credentials: LoginCredentials = { email, password };
      const usuarioResponse = await authService.login(credentials);
      const usuario = convertirUsuarioResponse(usuarioResponse);
      setUser(usuario);
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (datos: RegistroUsuarioRequest): Promise<void> => {
    setLoading(true);
    try {
      const usuarioResponse = await authService.registrar(datos);
      const usuario = convertirUsuarioResponse(usuarioResponse);
      setUser(usuario);
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}