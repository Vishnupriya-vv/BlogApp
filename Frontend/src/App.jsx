import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loginuser from './Components/Loginuser';
import Signup from './Components/signup';
import Viewblog from './Components/ViewBlog';
import AddBlog from './Components/AddBlog';
import Welcome from './Components/Welcome';
import AdminHome from './Components/AdminHome';
import EditBlog from './Components/Editblog';
import AuthProvider from './AuthContext';

function App() {
  const [count, setCount] = useState(0);

  return (
    <><AuthProvider>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/login" element={<Loginuser />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/View" element={<Viewblog />} />
            <Route path="/addblog" element={<AddBlog />} />
            <Route path="/edit" element={<EditBlog />} />
            <Route path="/" element={<Welcome />} /> 
           
            <Route path="/admin-home" element={<AdminHome />} /> 
          </Routes>
        </div>
      </Router>
      </AuthProvider></>
  );
}

export default App;