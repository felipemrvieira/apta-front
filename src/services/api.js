import axios from "axios";
import { getToken, getUid, getClient } from "./auth";

let API_URL = '';

if (process.env.NODE_ENV === 'production') {
    API_URL = "http://186.249.51.18/api"
}else{
    API_URL = "http://localhost:3001"
}

const api = axios.create({
    baseURL: API_URL
});

api.interceptors.request.use(async config => {
    const token = getToken();
    const uid = getUid();
    const client = getClient();

    if (token) {
        // config.headers.Authorization = `Bearer ${token}`;
        config.headers['access-token'] = `${token}`;
        config.headers.client = `${client}`;
        config.headers.uid = `${uid}`;
    }
    return config;
});

export default api;
