//import logo from './logo.svg';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './Login';
import Registration from './Registration';

import Reg from './Reg';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registration/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/reg" element={<Reg />}></Route>
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
