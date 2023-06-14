import './App.css';
import { Route, Routes } from "react-router-dom";
import LadingPage from './views/LadinPage';
import Home from './views/Home';
import Detail from './views/Detail';
import FormPage from './views/FormPage'


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LadingPage/>} />
        <Route path="/countries" element={<Home/>} />
        <Route path="/countries/:id" element={<Detail/>} />
        <Route path="/activity" element={<FormPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
