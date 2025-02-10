import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Define the Axios instance with TypeScript
const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});


// Response Interceptor
instance.interceptors.response.use(
    (res: AxiosResponse) => res,
    async (err) => {
        const originalConfig = err.config as AxiosRequestConfig & { _retry?: boolean; __isRetryRequest?: boolean };

        if (err.response) {
            if (err.response.status === 403 && !originalConfig._retry) {
                originalConfig._retry = true;

                // If refresh token expires, redirect to login
                if (err.response.status === 401 && !originalConfig.__isRetryRequest) {
                    originalConfig.__isRetryRequest = true;
                    return err.response;
                }

                try {
                    const rs: AxiosResponse<{ accessToken: string }> = await instance.get('/api/auth/token');
                    console.log(rs);

                    return instance(originalConfig);
                } catch (_error: unknown) {

                    if (_error instanceof AxiosError && _error.response?.status === 401) {
                        window.location.replace('#/login');
                        return _error.response;
                    }
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    }
);

export default instance;
