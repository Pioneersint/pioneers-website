import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
          localStorage.setItem('accessToken', data.data.accessToken);
          err.config.headers.Authorization = `Bearer ${data.data.accessToken}`;
          return api(err.config);
        } catch { logout(); }
      } else { logout(); }
    }
    return Promise.reject(err);
  }
);

interface User {
  id: string; name: string; email: string; role: string;
  phone?: string; avatar?: string; companyName?: string; jobTitle?: string;
  subscription?: { plan: string; status: string };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

interface RegisterData {
  name: string; email: string; password: string;
  phone?: string; companyName?: string; jobTitle?: string;
}

const AuthContext = createContext<AuthContextType>({
  user: null, isLoading: true, isAuthenticated: false, isAdmin: false,
  login: async () => {}, register: async () => {}, logout: () => {}, refreshUser: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const { data } = await api.get('/auth/me');
      setUser(data.data);
    } catch { setUser(null); }
    setIsLoading(false);
  }, []);

  useEffect(() => { refreshUser(); }, [refreshUser]);

  const login = useCallback(async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('accessToken', data.data.accessToken);
    localStorage.setItem('refreshToken', data.data.refreshToken);
    setUser(data.data.user);
  }, []);

  const register = useCallback(async (regData: RegisterData) => {
    const { data } = await api.post('/auth/register', regData);
    localStorage.setItem('accessToken', data.data.accessToken);
    localStorage.setItem('refreshToken', data.data.refreshToken);
    setUser(data.data.user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    window.location.href = '/';
  }, []);

  return (
    <AuthContext.Provider value={{
      user, isLoading, isAuthenticated: !!user, isAdmin: user?.role === 'ADMIN',
      login, register, logout, refreshUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export { logout };
function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.location.href = '/';
}
