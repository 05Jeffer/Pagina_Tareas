import axios from "axios";

const API = 'http://localhost:8000';

export interface Tarea {
    id: number;
    nombre: string;
    tarea: string;
    descripcion: string;
  }

  export const crearTarea = async (tarea: Tarea): Promise<Tarea> => {
    try {
      const respuesta = await axios.post<Tarea>(`${API}/api`, tarea);
      console.log('Respuesta de la API:', respuesta.data);
      return respuesta.data;
    } catch (error) {
      console.error(error);
      return { id: 0,nombre: '', tarea: '', descripcion: '' }
    }
  };

  export const obtenerTareas = async (): Promise<Tarea[]> => {
    try {
      const respuesta = await axios.get<Tarea[]>(`${API}/api`);
      console.log('Respuesta de la API:', respuesta.data);
      return respuesta.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  export const editarTarea = async (id: string, tarea: Tarea): Promise<Tarea> => {
    try {
      const respuesta = await axios.put<Tarea>(`${API}/api/${id}`, tarea);
      console.log('Respuesta de la API:', respuesta.data);
      return respuesta.data;
    } catch (error) {
      console.error(error);
      return { id: 0,nombre: '', tarea: '', descripcion: '' };
    }
  };

  export const eliminarTarea = async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API}/api/${id}`);
      console.log(`Tarea con ID ${id} eliminada correctamente`);
    } catch (error) {
      console.error(`Error al eliminar tarea con ID ${id}:`, error);
      throw error;
    }
  };