import { Auth } from "../domain/auth";
import { AuthRepository } from "../domain/authRepository";
import { query } from "../../database/db";

export class MysqlAuthRepository implements AuthRepository {
    async findByEmail(email: string): Promise<Auth | null> {
      const sql = "SELECT * FROM users WHERE email = ?";
      const params: any[] = [email];
      try {
        const [data]: any = await query(sql, params);
        if (data.length === 0) {
          return null;
        }
        const user = data[0];
        return new Auth(user.id, user.name, user.email, user.password);
      } catch (error) {
        console.error("Error in findByEmail:", error);
        return null;
      }
    }
    
  
    async save(auth: Auth): Promise<void> {
      const sql = "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)";
      const params: any[] = [auth.id, auth.name, auth.email, auth.password];
      try {
        await query(sql, params);
      } catch (error) {
        console.error("Error in save:", error);
      }
    }
  }