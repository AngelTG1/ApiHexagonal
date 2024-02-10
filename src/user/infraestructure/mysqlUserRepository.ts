import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";
import UserModel from "./model/userModel";
import { HashService } from "../services/hashService"; 


export class MysqlUserRepository implements UserRepository{
    private readonly hashService: HashService;

    constructor(hashService: HashService){
        this.hashService = hashService;
    }

    async getAll(): Promise<User[]> {
        try {
            const allUsers = await UserModel.findAll();
            const users = allUsers.map(user => new User(user.id, user.name, user.last_name, user.email, user.password));

            return users;
        } catch (error) {
            console.error("Error in MySQL getAll", error);
            return [];
        }
    }

    async addUser(name: string, last_name: string, email: string, password: string): Promise<User | null> {
        try {
            const hashedPassword = await this.hashService.hashPassword(password);
            const createdUser = await UserModel.create({ name, last_name, email, password: hashedPassword });
            return new User(createdUser.id, createdUser.name, createdUser.last_name, createdUser.email, createdUser.password);
        } catch (error) {
            console.error("Error In Psql", error);
            return null;
        }
    }

}