import { User } from "./user";

export interface UserRepository{
    getUser(id: number): unknown;
    getAll(): Promise<User[] | null>;
    addUser(name: string, email: string, password: string): Promise<User | null>;
    UpdateUser(id: number, name: string, email: string, password: string): Promise<User | null>;
    deleteUser(id: number): Promise<User | null>;
}