import { User } from "./user";

export interface UserRepository{
    getAll(): Promise<User[] | null>;
    addUser(name: string, last_name: string): Promise<User | null>;
}