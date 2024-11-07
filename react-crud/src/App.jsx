import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {




  return (
    <>
  
      <Router>
        <Routes>
         <Route path="/" element={<Login />} />
         


        </Routes>
      </Router>
    </>
  );
}

export default App;
