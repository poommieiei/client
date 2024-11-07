// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/home";
import Login from './pages/login';
import Order from './pages/myOrder';

function App() {
  return (
    <div className="container py-4">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />

          <Route path="/login" element={<Login />} />          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
