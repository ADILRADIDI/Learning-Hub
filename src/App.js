import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import MyEnrollments from "./pages/MyEnrollments";
import Login from "./pages/Login";
import "./styles.css";


function App() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
        <Router>
            <Navbar />
            <main className="mx-auto w-full max-w-6xl px-4 py-6">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/my-enrollments" element={<MyEnrollments />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
        </Router>
        </div>
    );
}
export default App;
