import { IUploadsRepository } from '../domain/uploads.repository';

export const uploadExcelUseCase = (uploadRepository: IUploadsRepository) => {
    return uploadRepository.upload
}