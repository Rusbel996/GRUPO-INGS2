import './App.css';
import {  Navigate, Route, Routes, useLocation } from 'react-router-dom';

//importamos los comp creados
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home'
import NavBarExample from './layouts/navbar';
import Login from './components/Login';
import Perfil from './components/Perfil';

function App() {
  const PathName= useLocation()
  console.log(PathName.pathname)
  return (
    <div className="App">


<Routes>
  <Route path='/' element={ <NavBarExample /> }>
    <Route index element={ <Home /> } />
    <Route path='about' element={ <About /> } />
    <Route path='contact' element={ <Contact /> } />
    <Route path='login' element={ <Login /> } />
    <Route path='Perfil' element={ <Perfil /> } />
    <Route path='*' element={ <Navigate replace to="/"/> }/>

  </Route>
</Routes> 


    </div>
  );
}

export default App;
