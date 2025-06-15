import './App.css';
import { Routes,Route } from 'react-router-dom';
import Home from '../src/components/home';
import Create from './components/create';
import About from './components/about';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Home/>}></Route>
        <Route path="/create" element={<Create/>}></Route>
        <Route path="/about" element={<About/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
