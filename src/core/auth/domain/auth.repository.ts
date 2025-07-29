import { ILoginReq, ILoginRes } from "./login";

export interface IAuthRepository {
  login(body: ILoginReq): Promise<ILoginRes | void>;
  verifyToken(token: string): Promise<void>;
}