import axios from 'axios';

// Créez une instance d'Axios
const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Remplacez par l'URL de votre API
});

// Ajoutez un intercepteur pour inclure le token d'authentification
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Assurez-vous que le token est stocké dans le localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;