import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  data: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for handling cookies
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add it to headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error('API Error:', error.response?.data || error);
    
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      // Clear auth data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect to login if needed
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: async (userData: any): Promise<RegisterResponse> => {
    try {
      console.log('Registering user:', userData);
      const response = await api.post<RegisterResponse>('/auth/register', userData);
      console.log('Registration response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error);
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Registration failed'
      );
    }
  },

  login: async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
    try {
      console.log('Logging in user:', credentials.email);
      const response = await api.post<LoginResponse>('/auth/login', credentials);
      console.log('Login response:', response.data);

      if (response.data.success && response.data.token) {
        // Store token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        return response.data;
      } else {
        throw new Error(response.data.message || 'Login failed - No token received');
      }
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error);
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Login failed'
      );
    }
  },

  logout: async () => {
    try {
      console.log('Logging out user');
      const response = await api.post('/auth/logout');
      console.log('Logout response:', response.data);
      
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      return response.data;
    } catch (error: any) {
      console.error('Logout error:', error.response?.data || error);
      // Still remove local storage items even if the API call fails
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Logout failed'
      );
    }
  },
};

export default api;
