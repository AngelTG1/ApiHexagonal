import { Auth } from "./auth";

export interface AuthRepository {
  findByEmail(email: string): Promise<Auth | null>;
  save(auth: Auth): Promise<void>;
  
}