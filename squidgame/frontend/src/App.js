import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar';


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>

        <Route path="hola" element={<NavBar />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
