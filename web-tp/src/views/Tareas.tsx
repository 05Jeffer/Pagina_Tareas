import React, { useState, useEffect } from 'react';
import { Tarea, crearTarea,obtenerTareas, editarTarea, eliminarTarea } from '../Api';
import CrearTareas from './CrearTareas';
import Swal from 'sweetalert2';

const Tareas = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [editandoTarea, setEditandoTarea] = useState<number | null>(null);
  const [campoEditado, setCampoEditado] = useState<string>('');

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const tareas = await obtenerTareas();
        setTareas(tareas);
      } catch (error) {
        console.error('Error obteniendo tareas:', error);
      }
    };

    fetchTareas();
  }, []);

  const handleGuardarEdicion = async (index: number, tareaEditada: Tarea) => {
    if (editandoTarea !== null) {
      try {
        // Actualizar localmente antes de recibir respuesta del servidor
        const nuevasTareas = [...tareas];
        nuevasTareas[index] = tareaEditada;
        setTareas(nuevasTareas);
  
        // Enviar la solicitud al servidor
        await editarTarea(String(tareas[index].id), tareaEditada);
  
        setEditandoTarea(null);
        Swal.fire('¡Tarea actualizada!', '', 'success');
      } catch (error) {
        console.error('Error actualizando tarea:', error);
        if(error instanceof Error){
          Swal.fire('Error al actualizar la tarea', error.message, 'error');
        } else {
          Swal.fire('Error al actualizar la tarea', 'Ha ocurrido un error', 'error');
        }
      }
    }
  };

  const handleEliminarTarea = async (index: number) => {
    try {
      await eliminarTarea(String(tareas[index].id));
      const nuevasTareas = tareas.filter((_, i) => i !== index);
      setTareas(nuevasTareas);
      Swal.fire('¡Tarea eliminada!', '', 'success');
    } catch (error) {
      console.error('Error eliminando tarea:', error);
      if (error instanceof Error) {
        Swal.fire('Error al eliminar la tarea', error.message, 'error');
      } else {
        Swal.fire('Error al eliminar la tarea', 'Ha ocurrido un error', 'error');
      }
    }
  };
  

  const handleTareaCreada = async (nuevaTarea: Tarea) => {
    try {
      // Enviar la solicitud al servidor para crear la nueva tarea
      await crearTarea(nuevaTarea);
  
      // Obtener la lista actualizada de tareas del servidor
      const tareasActualizadas = await obtenerTareas();
  
      // Actualizar localmente la lista de tareas con las tareas actualizadas
      setTareas(tareasActualizadas);
      Swal.fire('¡Tarea creada!', '', 'success');
    } catch (error) {
      console.error('Error creando tarea:', error);
      if (error instanceof Error) {
        Swal.fire('Error al crear la tarea', error.message, 'error');
      } else {
        Swal.fire('Error al crear la tarea', 'Ha ocurrido un error', 'error');
      }
    }
  };
  
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  if (editandoTarea !== null) {
    setTareas(prevTareas => {
      const newTareas = [...prevTareas];
      if (name === 'nombre' || name === 'tarea' || name === 'descripcion') {
        newTareas[editandoTarea][name] = value;
      }
      return newTareas;
    });
    setCampoEditado(name);
  }
};

const handleCancelarEdicion = () => {
  setEditandoTarea(null);
  setCampoEditado('');
};

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center min-h-screen bg-slate-900 p-4">
      <div className="w-full md:max-w-md mr-4 mb-4 md:mb-0">
        <CrearTareas onTareaCreada={handleTareaCreada} />
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full">
        <ul>
          {tareas.map((tarea, index) => (
            <li key={index} className="border-b border-gray-200 py-2 flex flex-col lg:flex-row justify-between items-start lg:items-center">
              <div className="w-full lg:w-auto">
                {editandoTarea === index ? (
                  <div>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="nombre"
                      value={campoEditado === 'nombre' ? tarea.nombre : tarea.nombre}
                      onChange={handleInputChange}
                    />
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="tarea"
                      value={campoEditado === 'tarea' ? tarea.tarea : tarea.tarea}
                      onChange={handleInputChange}
                    />
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="descripcion"
                      value={campoEditado === 'descripcion' ? tarea.descripcion : tarea.descripcion}
                      onChange={handleInputChange}
                    />
                  </div>
                ) : (
                  <div>
                    <h2 className="font-bold">{tarea.nombre}</h2>
                    <p>{tarea.tarea}</p>
                    <p className="text-sm text-gray-500">{tarea.descripcion}</p>
                  </div>
                )}
              </div>
              <div className='flex justify-between items-center mt-4 lg:mt-0 lg:w-auto'>
                {editandoTarea === index ? (
                  <>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => handleGuardarEdicion(index, tarea)}
                    >
                      Guardar
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      onClick={handleCancelarEdicion}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => setEditandoTarea(index)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => handleEliminarTarea(index)}
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tareas;
