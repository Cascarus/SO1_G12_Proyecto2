import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar'
import './bootstrap.min.css'
import Home from './components/home';
import Players from './views/players';


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>

        <Route exact path="/" element={<Home />} />
        <Route exact path="/players" element={<Players />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
