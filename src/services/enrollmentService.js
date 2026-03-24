import axios from "axios";
import { authHeader } from "./authService";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const getMyEnrollments = async () => {
    const response = await axios.get(`${API_URL}/enrollments/me`, {
        headers: {
            ...authHeader(),
        },
    });

    return response.data;
};

export const enrollInCourse = async (courseId) => {
    const response = await axios.post(
        `${API_URL}/enrollments`,
        { course: courseId },
        {
            headers: {
                ...authHeader(),
            },
        }
    );

    return response.data;
};