import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
// Request — attach token
API.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ✅ Response — handle 401 token refresh automatically
API.interceptors.response.use(
  res => res,
  async err => {
    const original = err.config;

    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refresh = localStorage.getItem('refresh_token');
        if (!refresh) throw new Error('No refresh token');

        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/token/refresh/`,
          { refresh }
        );

        localStorage.setItem('access_token', data.access);
        original.headers.Authorization = `Bearer ${data.access}`;
        return API(original); // retry original request with new token
      } catch {
        // Refresh also failed — force logout
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

// Auth
export const registerUser = (data) => API.post('/auth/register/', data);
export const loginUser    = (data) => API.post('/auth/login/',    data);
export const logoutUser   = (data) => API.post('/auth/logout/',   data);
export const getProfile   = ()     => API.get('/auth/profile/');

// Dashboard
export const getDashboardStats = ()     => API.get('/dashboard/stats/');
export const getUserOrders     = ()     => API.get('/dashboard/orders/');
export const createOrder       = (data) => API.post('/dashboard/orders/', data);
export const getPaymentHistory = ()     => API.get('/dashboard/payments/');
export const updateProfile     = (data) => API.put('/dashboard/update-profile/', data);
export const changePassword    = (data) => API.post('/dashboard/change-password/', data);

export default API;