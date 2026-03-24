import axios from "axios";

const API_URL = "http://localhost:5000/course-service"; // adapte selon ton backend

export const getAllCourses = async () => {
    try {
        const response = await axios.get(`${API_URL}/courses`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des cours:", error);
        return [];
    }
};