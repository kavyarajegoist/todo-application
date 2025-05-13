import { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

type AuthContext = {
    accessToken: string;
    setAccessToken: (accessToken: string) => void;
    refreshToken: string;
    setRefreshToken: (refreshToken: string) => void;
    logout: () => void;
    refreshAccessToken: () => Promise<void>;
}

// Create the context with default values
const AuthContext = createContext<AuthContext | undefined>(undefined);

// Create a provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string>(localStorage.getItem('token') || '');
    const [refreshToken, setRefreshToken] = useState<string>('');

    const logout =async() => {
        // Clear tokens
        await axios.post('/api/user/logout/',{
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        })
        setAccessToken('');
        setRefreshToken('');
        
        // Remove from storage
        localStorage.removeItem('token');
    };

    const refreshAccessToken = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/user/refresh', {}, {
                withCredentials: true
            });
            
            const { accessToken } = response.data;
            setAccessToken(accessToken);
            localStorage.setItem('token', accessToken);
        } catch (error) {
            console.error('Token refresh failed:', error);
            throw error;
        }
    };

    const value = {
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        logout,
        refreshAccessToken
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

