import api from '@/api/client';
import { User, RegisterData } from '@/auth/types';

const TOKEN_KEY = 'access_token';

// This is a MOCK service. In a real app, it would make API calls.
export const authService = {
  async login(email: string, password: string): Promise<User> {
    console.log("Attempting login for:", email);
    // MOCK API CALL
    return new Promise((resolve) => {
        setTimeout(() => {
            const mockUser: User = { id: '1', username: 'DegenGambler', email, role: 'user' };
            localStorage.setItem(TOKEN_KEY, 'mock_access_token');
            resolve(mockUser);
        }, 1000);
    });
  },

  async register(data: RegisterData): Promise<User> {
    console.log("Attempting registration for:", data.username);
    // MOCK API CALL
     return new Promise((resolve) => {
        setTimeout(() => {
            const mockUser: User = { id: '1', username: data.username, email: data.email, role: 'user' };
            localStorage.setItem(TOKEN_KEY, 'mock_access_token');
            resolve(mockUser);
        }, 1000);
    });
  },

  async refresh(): Promise<User> {
     console.log("Attempting to refresh token...");
     // MOCK REFRESH LOGIC
     return new Promise((resolve, reject) => {
         setTimeout(() => {
            const token = localStorage.getItem(TOKEN_KEY);
            if (token === 'mock_access_token_expired') {
                 console.log("Mock refresh failed.");
                 reject(new Error("Session expired"));
            } else if (token) {
                console.log("Mock refresh successful.");
                const mockUser: User = { id: '1', username: 'DegenGambler', email: 'degen@zap.gg', role: 'user' };
                resolve(mockUser);
            }
            else {
                 console.log("No token, refresh failed.");
                 reject(new Error("No active session"));
            }
         }, 500);
     });
  },

  logout() {
    console.log("Logging out.");
    localStorage.removeItem(TOKEN_KEY);
    // In a real app, this would also call an API to invalidate the refresh token.
    // return api.post('/auth/logout');
    return Promise.resolve();
  },

  getAccessToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
};
