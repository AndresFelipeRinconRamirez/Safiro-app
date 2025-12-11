import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'estudiante' | 'profesor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuarios mock para pruebas
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Estudiante Demo',
    email: 'estudiante@safiro.com',
    role: 'estudiante',
  },
  {
    id: '2',
    name: 'Profesor Demo',
    email: 'profesor@safiro.com',
    role: 'profesor',
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Buscar usuario mock
    const foundUser = MOCK_USERS.find((u) => u.email === email);

    if (foundUser && password === 'demo123') {
      setUser(foundUser);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
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