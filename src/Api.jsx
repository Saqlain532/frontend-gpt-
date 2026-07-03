import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL,
});

// State variables to handle concurrent requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      // If we are already refreshing, queue this request
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
        .then(token => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!refreshToken) {
          localStorage.clear();
          if (window.location.pathname !== '/signup') window.location.href = '/signup';
          return Promise.reject(error);
        }

        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/refresh`, {
          refreshToken: refreshToken
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;
        
        localStorage.setItem('accessToken', accessToken);
        // Only set this if your backend actually rotates the refresh token every time
        if (newRefreshToken) {
            localStorage.setItem('refreshToken', newRefreshToken);
        }

        // Process all the queued requests with the new token
        processQueue(null, accessToken);

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return api(originalRequest);

      } catch (refreshError) {
        console.error("Refresh Token Error:", refreshError);
        processQueue(refreshError, null);
        localStorage.clear();
        
        if (window.location.pathname !== '/signup') {
          window.location.href = '/signup';
        }
        return Promise.reject(refreshError);
      } finally {
        // Always reset the lock, whether it succeeded or failed
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;