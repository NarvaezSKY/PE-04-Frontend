export interface IUploadsRepository {
    upload(file: File): Promise<string>
}