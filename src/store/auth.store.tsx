import { create } from 'zustand';

import { authRepository } from '@/core/auth/infrastructure/auth.repository';
import { loginUseCase } from '@/core/auth/application/login.use-case';
import { verifyTokenUseCase } from '@/core/auth/application/verifyToken.use-case';
import { ILoginReq, ILoginRes } from '@/core/auth/domain/login';

type State = {
    user: ILoginRes | null;
    isAuthenticated: boolean;
    authError: string | null;
};

type Actions = {
    login: (body: ILoginReq) => Promise<ILoginRes | void>;
    verifyToken: (token: string) => Promise<void>;
    logout: () => void;
};

type Store = State & Actions;

export const useAuthStore = create<Store>((set) => ({
    isAuthenticated: false,
    authError: null,
    user: null,

    login: async (body: ILoginReq) => {
        try {
            const response = await loginUseCase(authRepository)(body);
            if (response && response.token) {
                sessionStorage.setItem('token', response.token);
                set({ isAuthenticated: true, authError: null, user: response });
                return response;
            } else {
                set({ authError: "Login failed", user: null, isAuthenticated: false });
            }
        } catch (error) {
            console.error("Login error:", error);
            set({ authError: "Login failed" });
        }
    },

    verifyToken: async (token: string) => {
        try {
            await verifyTokenUseCase(authRepository)(token);
            set({ isAuthenticated: true, authError: null });
        } catch (error) {
            console.error("Token verification error:", error);
            set({ authError: "Token verification failed" });
        }
    },

    logout: () => {
        set({ isAuthenticated: false, authError: null });
    },
}));