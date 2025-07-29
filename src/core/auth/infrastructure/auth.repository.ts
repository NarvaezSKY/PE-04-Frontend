import axiosInstance from "@/config/axios";
import { IAuthRepository } from "../domain/auth.repository";
import { ILoginReq } from "../domain/login";

const login = async (body: ILoginReq): Promise<void> => {
    try {
        const response = await axiosInstance.post('/auth/login', body);
        console.log('Login successful:', response.data);
        return response.data;
    } catch (error) {
        throw new Error('Login failed');
    }
};

const verifyToken = async (token: string): Promise<void> => {
    try {
        const response = await axiosInstance.get('/auth/verify', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Token verification successful:', response.data);
    } catch (error) {
        throw new Error('Token verification failed');
    }
};

export const authRepository: IAuthRepository = { 
    login: login, 
    verifyToken: verifyToken 
};
