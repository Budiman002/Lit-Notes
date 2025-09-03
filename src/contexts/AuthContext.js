import { createContext, useContext, useState, useEffect } from 'react';
import { getAccessToken, putAccessToken, getUserLogged } from '../utils/network-data';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status saat app dimuat
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = getAccessToken();
    
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const result = await getUserLogged();
      if (!result.error) {
        setUser(result.data);
        setIsAuthenticated(true);
      } else {
        // Token tidak valid, hapus dari localStorage
        localStorage.removeItem('accessToken');
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const result = await import('../utils/network-data').then(module => 
        module.login(credentials)
      );
      
      if (!result.error) {
        putAccessToken(result.data.accessToken);
        await checkAuthStatus(); // Refresh user data
        return { success: true };
      } else {
        return { success: false, message: 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}