/**
 * Servicio de materias
 * Maneja la obtención y gestión de materias/asignaturas
 */

import api from './api';
import { UsuarioResponse } from './auth-service';

/**
 * DTO para respuesta de materia desde el API
 * Basado en MateriaResponse del API de Safiro
 */
export interface MateriaResponse {
  idMateria: number;
  nombreMateria: string;
  usuario: UsuarioResponse;
  fechaCreacion: string;
  fechaActualizacion?: string;
}

/**
 * DTO para crear una nueva materia
 * Basado en MateriaRequest del API
 */
export interface MateriaRequest {
  nombreMateria: string;
  idUsuario: number;
}

/**
 * DTO para actualizar nombre de materia
 */
export interface MateriaActualizarNombreRequest {
  nombreMateria: string;
}

/**
 * DTO para cambiar usuario responsable de materia
 */
export interface MateriaCambiarUsuarioRequest {
  idUsuario: number;
}

/**
 * Servicio de materias
 */
const materiasService = {
  /**
   * Obtener todas las materias de un usuario (estudiante o profesor)
   * GET /api/v1/materias/usuario/{idUsuario}
   */
  async obtenerMateriasPorUsuario(
    idUsuario: number
  ): Promise<MateriaResponse[]> {
    try {
      const response = await api.get<MateriaResponse[]>(
        `/materias/usuario/${idUsuario}`
      );
      return response;
    } catch (error) {
      console.error('Error al obtener materias del usuario:', error);
      throw error;
    }
  },

  /**
   * Obtener todas las materias del sistema
   * GET /api/v1/materias
   */
  async obtenerTodasLasMaterias(): Promise<MateriaResponse[]> {
    try {
      const response = await api.get<MateriaResponse[]>('/materias');
      return response;
    } catch (error) {
      console.error('Error al obtener todas las materias:', error);
      throw error;
    }
  },

  /**
   * Obtener una materia por ID
   * GET /api/v1/materias/{id}
   */
  async obtenerMateriaPorId(id: number): Promise<MateriaResponse> {
    try {
      const response = await api.get<MateriaResponse>(`/materias/${id}`);
      return response;
    } catch (error) {
      console.error('Error al obtener materia por ID:', error);
      throw error;
    }
  },

  /**
   * Crear una nueva materia
   * POST /api/v1/materias
   */
  async crearMateria(datos: MateriaRequest): Promise<MateriaResponse> {
    try {
      const response = await api.post<MateriaResponse>('/materias', datos);
      return response;
    } catch (error) {
      console.error('Error al crear materia:', error);
      throw error;
    }
  },

  /**
   * Actualizar nombre de una materia
   * PUT /api/v1/materias/{id}/nombre
   */
  async actualizarNombreMateria(
    id: number,
    datos: MateriaActualizarNombreRequest
  ): Promise<MateriaResponse> {
    try {
      const response = await api.put<MateriaResponse>(
        `/materias/${id}/nombre`,
        datos
      );
      return response;
    } catch (error) {
      console.error('Error al actualizar nombre de materia:', error);
      throw error;
    }
  },

  /**
   * Cambiar usuario responsable de una materia
   * PUT /api/v1/materias/{id}/usuario
   */
  async cambiarUsuarioMateria(
    id: number,
    datos: MateriaCambiarUsuarioRequest
  ): Promise<MateriaResponse> {
    try {
      const response = await api.put<MateriaResponse>(
        `/materias/${id}/usuario`,
        datos
      );
      return response;
    } catch (error) {
      console.error('Error al cambiar usuario de materia:', error);
      throw error;
    }
  },

  /**
   * Eliminar una materia
   * DELETE /api/v1/materias/{id}
   */
  async eliminarMateria(id: number): Promise<void> {
    try {
      await api.delete(`/materias/${id}`);
    } catch (error) {
      console.error('Error al eliminar materia:', error);
      throw error;
    }
  },
};

export default materiasService;
