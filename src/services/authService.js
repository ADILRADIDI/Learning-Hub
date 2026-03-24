import axios from "axios";

const API_URL = "http://localhost:5000/auth-service";

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        console.log("Connexion réussie", response.data);
        // ici tu peux stocker le token dans localStorage si besoin
    } catch (error) {
        console.error("Erreur de connexion:", error);
    }
};