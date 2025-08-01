import React, { createContext, useContext, useState, useEffect } from 'react';

// Mock user type
interface User {
  id: string;
  email: string;
  name: string;
  birthDate?: string;
  profilePhoto?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('mtmsUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // For demo purposes, we're using localStorage
  // In a real app, this would be a proper authentication system
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo login - in a real app this would validate with a backend
      if (email === 'demo@example.com' && password === 'password') {
        const mockUser = {
          id: '123',
          email: 'demo@example.com',
          name: 'Demo User',
          profilePhoto: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600'
        };
        
        setUser(mockUser);
        localStorage.setItem('mtmsUser', JSON.stringify(mockUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo signup - would create a user in the backend in a real app
      const mockUser = {
        id: (Math.random() * 1000).toFixed(0),
        email,
        name,
      };
      
      setUser(mockUser);
      localStorage.setItem('mtmsUser', JSON.stringify(mockUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mtmsUser');
  };

  const forgotPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      // In a real app, this would send a password reset email
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('mtmsUser', JSON.stringify(updatedUser));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Profile update failed');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    forgotPassword,
    updateProfile,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}