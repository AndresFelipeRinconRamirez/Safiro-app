/**
 * Servicio de autenticación
 * Maneja el registro, login y gestión de sesiones
 */

import api from './api';

/**
 * Tipos de perfil según el API de Safiro
 */
export enum TipoPerfil {
  ESTUDIANTE = 1,
  PROFESOR = 2,
  ADMINISTRADOR = 3,
}

/**
 * DTO para registro de usuario (request)
 * Basado en UsuarioRegistroRequest del API
 */
export interface RegistroUsuarioRequest {
  email: string;
  password: string;
  primerNombre: string;
  primerApellido: string;
  fechaNacimiento: string; // Formato: YYYY-MM-DD
  idTipoPerfil: TipoPerfil;
  segundoNombre?: string;
  segundoApellido?: string;
  telefono?: string;
  biografia?: string;
  pais?: string;
  ciudad?: string;
}

/**
 * DTO para respuesta de usuario (response)
 * Basado en UsuarioResponse del API
 */
export interface UsuarioResponse {
  idUsuario: number;
  nombre: string;
  email: string;
  telefono: string;
  emailVerificado: boolean;
  activo: boolean;
  idTipoPerfil: number;
  nombreTipoPerfil: string;
  fechaCreacion: string;
  fechaActualizacion: string;
}

/**
 * Interfaz para credenciales de login
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Servicio de autenticación
 */
const authService = {
  /**
   * Registrar nuevo usuario
   * POST /api/v1/usuarios/registrar
   */
  async registrar(datos: RegistroUsuarioRequest): Promise<UsuarioResponse> {
    try {
      const response = await api.post<UsuarioResponse>(
        '/usuarios/registrar',
        datos
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Buscar usuario por email
   * GET /api/v1/usuarios/email/{email}
   */
  async buscarPorEmail(email: string): Promise<UsuarioResponse> {
    try {
      const response = await api.get<UsuarioResponse>(
        `/usuarios/email/${email}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Login de usuario
   * Nota: Como el API no tiene endpoint de login con JWT aún,
   * validamos buscando el usuario por email.
   * TODO: Reemplazar con endpoint de login cuando se implemente JWT
   */
  async login(credentials: LoginCredentials): Promise<UsuarioResponse> {
    try {
      // Buscar usuario por email
      const usuario = await this.buscarPorEmail(credentials.email);

      // TODO: El API debe validar la contraseña y retornar un token JWT
      // Por ahora solo verificamos que el usuario exista y esté activo
      if (!usuario.activo) {
        throw new Error('Usuario inactivo');
      }

      if (!usuario.emailVerificado) {
        throw new Error('Email no verificado');
      }

      return usuario;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener usuario por ID
   * GET /api/v1/usuarios/{id}
   */
  async obtenerUsuario(id: number): Promise<UsuarioResponse> {
    try {
      const response = await api.get<UsuarioResponse>(`/usuarios/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Actualizar perfil de usuario
   * PUT /api/v1/usuarios/{id}/perfil
   */
  async actualizarPerfil(
    id: number,
    datos: Partial<RegistroUsuarioRequest>
  ): Promise<UsuarioResponse> {
    try {
      const response = await api.put<UsuarioResponse>(
        `/usuarios/${id}/perfil`,
        datos
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Cambiar contraseña
   * PUT /api/v1/usuarios/{id}/password
   */
  async cambiarPassword(
    id: number,
    passwordActual: string,
    passwordNueva: string
  ): Promise<void> {
    try {
      await api.put(`/usuarios/${id}/password`, {
        passwordActual,
        passwordNueva,
      });
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
