import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar'
import './bootstrap.min.css'
import Home from './components/home';
import Players from './views/players';
import Workers from './views/workers';
import Games from './views/games';
import Logs from './views/logs';


function App() {
  return (
    <BrowserRouter >
      <NavBar />
      <Routes >

        <Route exact path="/" element={<Home />} />
        <Route exact path="/players" element={<Players />} />
        <Route exact path="/workers" element={<Workers />} />
        <Route exact path="/games" element={<Games />} />
        <Route exact path="/logs" element={<Logs />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
