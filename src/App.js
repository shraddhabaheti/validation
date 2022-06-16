

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './Login';
import Registration from './Registration';
import Reg from './Reg';
import Loginf from './Loginf';
import Home from './Home';
import Homes from './Homes';
function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Reg />}></Route>
          <Route path='/login' element={<Loginf />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/reg" element={<Registration />}></Route>
          <Route path="/loginc" element={<Login />}></Route>
          <Route path="/homes" element={<Homes />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
