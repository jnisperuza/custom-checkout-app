import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.toJSON()?.message.includes('Network')) {
            alert('No hay comunicación con el servidor');
        }
        if (error?.response?.status === 500) {
            alert('Error interno del servidor');
        }
        // Do something with request error
        return Promise.reject(error);
    }
);

export default axiosInstance;