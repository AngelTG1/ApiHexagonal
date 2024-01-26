import { User } from "./user";

export interface UserRepository{
    addUser(name: string, last_name: string): Promise<User | null>;
}