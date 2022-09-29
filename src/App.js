import './App.scss';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Landing from './pages/landing/Landing';
import Home from './pages/home/Home';
import AddMed from './pages/addMed/AddMed';
import Log from './pages/log/Log';
import Register from './pages/register/Register';
import EditModal from './components/editModal/EditModal';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/profile" element={<Home />}/>
          <Route path="/add" element={<AddMed />}/>
          <Route path="/log" element={<Log />}/>
          <Route path="/edit/:id" element={<EditModal />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
