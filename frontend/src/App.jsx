import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import { Toaster } from "react-hot-toast";
import EditUser from "./components/EditUser";
function App() {
  return (
    <Router>
      <Toaster position="top-right"/>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/profiles" element={<Home />} />
        <Route path="/profiles/:id" element={<EditUser />} />
        {/* You can add a Home route later */}
      </Routes>
    </Router>
  );
}

export default App;
