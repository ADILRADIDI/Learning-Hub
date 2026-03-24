import axios from "axios";
import { authHeader } from "./authService";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const getAllCourses = async () => {
    const response = await axios.get(`${API_URL}/courses`);
    return response.data;
};

export const createCourse = async (payload) => {
    const response = await axios.post(`${API_URL}/courses`, payload, {
        headers: {
            ...authHeader(),
        },
    });

    return response.data;
};