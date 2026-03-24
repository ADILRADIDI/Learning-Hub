import axios from "axios";

const API_URL = "http://localhost:5000/enrollment-service";

export const getMyEnrollments = async () => {
    try {
        const response = await axios.get(`${API_URL}/enrollments`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des inscriptions:", error);
        return [];
    }
};