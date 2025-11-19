import axios from "axios";

const instance = axios.create({
    baseURL: `${import.meta.env.API_URL}`,
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    // execluding Authorization header on /auth/login
    if (token && config.url !== "/auth/login") {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default instance;
