import './App.scss';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Header from './components/header/Header';
import Landing from './pages/landing/Landing';
import Home from './pages/home/Home';
import AddMed from './pages/addMed/AddMed';
import Log from './pages/log/Log';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/profile" element={<Home />}/>
          <Route path="/add" element={<AddMed />}/>
          <Route path="/log" element={<Log />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
