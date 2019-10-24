import axios from "axios";

const api = axios.create({
    baseURL: 'http://10.30.0.169:8080/'
});

export default api;