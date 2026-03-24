import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const TOKEN_KEY = "learning_hub_token";
const USER_KEY = "learning_hub_user";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getCurrentUser = () => {
    const rawUser = localStorage.getItem(USER_KEY);
    return rawUser ? JSON.parse(rawUser) : null;
};

const saveSession = (payload) => {
    localStorage.setItem(TOKEN_KEY, payload.token);
    localStorage.setItem(
        USER_KEY,
        JSON.stringify({
            userId: payload.userId,
            username: payload.username,
            email: payload.email,
            role: payload.role,
        })
    );
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
};

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    saveSession(response.data);
    return response.data;
};

export const register = async (payload) => {
    const response = await axios.post(`${API_URL}/auth/register`, payload);

    const verification = await axios.post(
        `${API_URL}/auth/verify`,
        {},
        {
            headers: {
                Authorization: `Bearer ${response.data.token}`,
            },
        }
    );

    saveSession({
        token: response.data.token,
        userId: response.data.userId,
        username: payload.username,
        email: payload.email,
        role: verification.data.role,
    });

    return response.data;
};

export const authHeader = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};