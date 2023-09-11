import './App.css';
import LandingPage from './landingPage/homePage';
import {Routes, Route} from 'react-router-dom';
import Home from './home/Home'
import Detail from './components/detail';
import Formulario from './components/formulario';
import { useSelector } from 'react-redux';


function App() { 

  
  return (
    <div className="App" > 
    <Routes>
      <Route path='/' element={ <LandingPage/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/detail/:id' element={<Detail/>}/>
      <Route path='/formulario' element={<Formulario/>}/>
    </Routes>
    </div>
  );
}

export default App;
