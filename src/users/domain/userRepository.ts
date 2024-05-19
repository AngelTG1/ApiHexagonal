import { User } from "./user";

export interface UserRepository{
    getAll(): Promise<User[] | null>;
    addUser(name: string, email: string): Promise<User | null>;
}