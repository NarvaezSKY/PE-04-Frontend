import { IAuthRepository } from "../domain/auth.repository";

export const loginUseCase = (authRepository: IAuthRepository) => {
    return authRepository.login;
}