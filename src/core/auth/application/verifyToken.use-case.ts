import { IAuthRepository } from "../domain/auth.repository";

export const verifyTokenUseCase = (authRepository: IAuthRepository) => {
    return authRepository.verifyToken;
}