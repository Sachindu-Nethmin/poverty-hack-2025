// src/types/auth.ts

export type UserRole = 'local_user' | 'hospital' | 'government_admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  hospitalName?: string; // For hospital users
  district?: string;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData extends LoginCredentials {
  name: string;
  role: UserRole;
  hospitalName?: string;
  district?: string;
}
