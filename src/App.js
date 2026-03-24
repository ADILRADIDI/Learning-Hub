import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import MyEnrollments from "./pages/MyEnrollments";
import Login from "./pages/Login";
import "./styles.css"; // ton fichier CSS


function App() {
    return (
        <div className="body">
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/my-enrollments" element={<MyEnrollments />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
        </div>
    );
}
export default App;
