import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.toJSON()?.message.includes('Network')) {
            alert('There is no communication with the server.');
        }
        if (error?.response?.status === 500) {
            alert('Internal Server Error');
        }
        // Do something with request error
        return Promise.reject(error);
    }
);

export default axiosInstance;