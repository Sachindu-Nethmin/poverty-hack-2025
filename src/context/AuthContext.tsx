// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthState, SignupData, UserRole } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  hasRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for development - replace with actual API calls
const MOCK_USERS: Array<User & { password: string }> = [
  {
    id: '1',
    email: 'admin@health.gov.lk',
    password: 'admin123',
    name: 'Health Ministry Admin',
    role: 'government_admin',
    district: 'Colombo',
    createdAt: new Date(),
  },
  {
    id: '2',
    email: 'hospital@cgh.lk',
    password: 'hospital123',
    name: 'Dr. Sunil Perera',
    role: 'hospital',
    hospitalName: 'Colombo General Hospital',
    district: 'Colombo',
    createdAt: new Date(),
  },
  {
    id: '3',
    email: 'user@example.com',
    password: 'user123',
    name: 'Kasun Silva',
    role: 'local_user',
    district: 'Kandy',
    createdAt: new Date(),
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
  });

  // Check for stored user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          loading: false,
        });
      } catch (error) {
        localStorage.removeItem('user');
        setAuthState({ user: null, isAuthenticated: false, loading: false });
      }
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Normalize email to lowercase for comparison
    const normalizedEmail = email.toLowerCase().trim();
    
    const user = MOCK_USERS.find(
      u => u.email.toLowerCase() === normalizedEmail && u.password === password
    );

    if (!user) {
      console.error('Login failed for email:', normalizedEmail);
      console.log('Available users:', MOCK_USERS.map(u => u.email));
      throw new Error('Invalid email or password');
    }

    const { password: _, ...userWithoutPassword } = user;
    
    setAuthState({
      user: userWithoutPassword,
      isAuthenticated: true,
      loading: false,
    });

    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
  };

  const signup = async (data: SignupData): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if user already exists
    if (MOCK_USERS.some(u => u.email === data.email)) {
      throw new Error('User with this email already exists');
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      role: data.role,
      hospitalName: data.hospitalName,
      district: data.district,
      createdAt: new Date(),
    };

    // In production, this would be an API call
    MOCK_USERS.push({ ...newUser, password: data.password });

    setAuthState({
      user: newUser,
      isAuthenticated: true,
      loading: false,
    });

    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      loading: false,
    });
    localStorage.removeItem('user');
  };

  const hasRole = (roles: UserRole[]): boolean => {
    return authState.user ? roles.includes(authState.user.role) : false;
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
        hasRole,
      }}
    >
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
