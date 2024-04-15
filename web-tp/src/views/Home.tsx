import React from 'react';
import { Link } from 'react-router-dom';

import task from '../img/task-t.jpeg'

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      <div className="flex items-center justify-center w-full md:w-1/2 text-white bg-slate-900 p-8">
        <div>
          <h1 className="text-4xl mb-4">¡Bienvenido a Home Work!</h1>
          <p className="text-xl mb-8">Organiza tus tareas de manera eficiente</p>
          <Link to="/tareas" className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600 transition-colors">
            Acceder
          </Link> 
        </div>
      </div>
      <div className="w-full md:w-1/2 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${task})` }}></div>
    </div>
  );
};

export default Home;
