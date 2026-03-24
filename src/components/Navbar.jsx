import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Accueil</Link></li>
                <li><Link to="/courses">Cours</Link></li>
                <li><Link to="/my-enrollments">Mes Inscriptions</Link></li>
                <li><Link to="/login">Connexion</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;