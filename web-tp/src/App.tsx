import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NavBar from './components/navBar';
import Home from './views/Home';
import Tareas from './views/Tareas';


function App() {
  return (
    <Router> 
      <NavBar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Tareas' element={<Tareas/>}/>
      </Routes>
    </Router> 
  );
}

export default App;
