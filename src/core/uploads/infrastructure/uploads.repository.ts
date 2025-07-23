
import axiosInstance from '../../../config/axios/index';
import { IUploadsRepository } from '../domain/uploads.repository';

const uploadExcel = async (file: File): Promise<string> => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axiosInstance.post('/uploads', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error('File upload failed');
    }


}


export const uploadsRepository: IUploadsRepository = {
    upload: uploadExcel
}