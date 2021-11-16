import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar'
import './bootstrap.min.css'
import Home from './components/home';
import Players from './views/players';
import Workers from './views/workers';
import Games from './views/games';


function App() {
  return (
    <BrowserRouter basename={"myapp.34.68.145.104.nip.io"} >
      <NavBar />
      <Routes >

        <Route exact path="/" element={<Home />} />
        <Route exact path="/players" element={<Players />} />
        <Route exact path="/workers" element={<Workers />} />
        <Route exact path="/games" element={<Games />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
