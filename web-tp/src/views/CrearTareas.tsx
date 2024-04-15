import React, { useState } from 'react';
import { Tarea, crearTarea } from '../Api';

interface Props {
  onTareaCreada: (tarea: Tarea) => void;
}

const CrearTarea: React.FC<Props> = ({ onTareaCreada }) => {
  const [nuevaTarea, setNuevaTarea] = useState<Tarea>({ id: 0, nombre: '', tarea: '', descripcion: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tareaCreada = await crearTarea(nuevaTarea);
      onTareaCreada(tareaCreada);
      setNuevaTarea({ id: 0, nombre: '', tarea: '', descripcion: '' });
    } catch (error) {
      console.error('Error creando tarea:', error);
      // Manejar el error según sea necesario
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
          Nombre
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nombre" type="text" value={nuevaTarea.nombre} onChange={(e) => setNuevaTarea({ ...nuevaTarea, nombre: e.target.value })} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tarea">
          Tarea
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="tarea" type="text" value={nuevaTarea.tarea} onChange={(e) => setNuevaTarea({ ...nuevaTarea, tarea: e.target.value })} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
          Descripción
        </label>
        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="descripcion" value={nuevaTarea.descripcion} onChange={(e) => setNuevaTarea({ ...nuevaTarea, descripcion: e.target.value })} />
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Agregar Tarea
      </button>
    </form>
  );
};

export default CrearTarea;