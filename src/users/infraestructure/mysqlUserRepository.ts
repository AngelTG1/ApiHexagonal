import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";
import { query } from "../../database/db";

export class MysqlUserRepository implements UserRepository {
  getUser(id: number): unknown {
    throw new Error("Method not implemented.");
  }
  async getAll(): Promise<User[] | null> {
    const sql = "SELECT * FROM users";
    try {
      const [data]: any = await query(sql, []);
      const dataUsers = Object.values(JSON.parse(JSON.stringify(data)));

      return dataUsers.map(
        (user: any) => new User(user.id, user.name, user.email, user.password)
      );
    } catch (error) {
      return null;
    }
  }

  async addUser(name: string, email: string, password: string): Promise<User | null> {
    let user = null;
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    const params: any[] = [name, email, password];
    try {
      const [result]: any = await query(sql, params);
      //El objeto Result es un objeto que contiene info generada de la bd
      /*No es necesaria la validación de la cantidad de filas afectadas, ya que, al
            estar dentro de un bloque try/catch si hay error se captura en el catch */
      user = new User(result.id, result.name, result.email, result.password);
    } catch (error) { 
      user = null;
    } finally {
      return user;
    }
  }

  async UpdateUser(id: number, name: string, email: string, password: string): Promise<User | null> {
    let user = null
    const sql = "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
    const params: any[] = [name, email, password, id];
    try {
      const [result]: any = await query(sql, params);
      user = new User(result.id, result.name, result.email, result.password);
    } catch (error) {
      user = null;
    } finally {
      return user;
    }
  }

  async deleteUser(id: number): Promise<User | null> {
    
    let user = null;
    const sql = "DELETE FROM users WHERE id = ?";
    const params: any[] = [id];
    try {
      const [result]: any = await query(sql, params);
      user = new User(result.id, result.name, result.email, result.password);
    } catch (error) {
      user = null;
    } finally {
      return user;
    }
  }
}
