import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../services/authService";

const Navbar = () => {
    const navigate = useNavigate();
    const user = getCurrentUser();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
                <Link to="/" className="text-lg font-bold text-indigo-600">Learning Hub</Link>

                <ul className="flex items-center gap-4 text-sm font-medium text-slate-700">
                    <li><Link className="hover:text-indigo-600" to="/">Accueil</Link></li>
                    <li><Link className="hover:text-indigo-600" to="/courses">Cours</Link></li>
                    {user && <li><Link className="hover:text-indigo-600" to="/my-enrollments">Mes inscriptions</Link></li>}
                    {!user ? (
                        <li><Link className="rounded-lg bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-500" to="/login">Connexion</Link></li>
                    ) : (
                        <>
                            <li className="text-xs text-slate-500">{user.email} ({user.role})</li>
                            <li>
                                <button
                                    className="rounded-lg border border-slate-300 px-3 py-2 hover:bg-slate-100"
                                    onClick={handleLogout}
                                >
                                    Déconnexion
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;