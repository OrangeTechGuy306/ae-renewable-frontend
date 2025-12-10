'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { User } from '@/types/auth';
import { getToken, setToken, removeToken, getStoredUser, setStoredUser, clearAuth } from '@/lib/auth';

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
    updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setTokenState] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize auth state from localStorage
    useEffect(() => {
        const storedToken = getToken();
        const storedUser = getStoredUser();

        if (storedToken && storedUser) {
            setTokenState(storedToken);
            setUser(storedUser);
        }

        setIsLoading(false);
    }, []);

    const login = (userData: User, authToken: string) => {
        setUser(userData);
        setTokenState(authToken);
        setToken(authToken);
        setStoredUser(userData);
    };

    const logout = () => {
        setUser(null);
        setTokenState(null);
        clearAuth();
    };

    const updateUser = (userData: User) => {
        setUser(userData);
        setStoredUser(userData);
    };

    const value = {
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        logout,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}
