import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, logoutUser } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Check if token exists and validate it
    if (token) {
      // Here you could validate the token with the backend
      // For now, we'll just set the user from localStorage
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error('Error parsing saved user:', error);
          // Clear invalid data
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          setToken(null);
        }
      }
    }
    setLoading(false);
    setInitialized(true);
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await loginUser(username, password);
      const { token: newToken, user: userData } = response;
      
      setToken(newToken);
      setUser(userData);
      
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Login failed' 
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    logoutUser();
  };

  const isAuthenticated = !!token && !!user;
  const isAdmin = user?.role === 'admin';
  const isDirector = user?.role === 'director';
  const isTeacher = user?.role === 'teacher';
  const isPreceptor = user?.role === 'preceptor';

  const value = {
    user,
    token,
    loading,
    initialized,
    isAuthenticated,
    isAdmin,
    isDirector,
    isTeacher,
    isPreceptor,
    login,
    logout
  };

  // Solo renderizar cuando esté inicializado
  if (!initialized) {
    return null;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 