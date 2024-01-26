import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";
import UserModel from "./model/userModel";


export class MysqlUserRepository implements UserRepository{

    async getAll(): Promise<User[]> {
        try {
            const allUsers = await UserModel.findAll();
            const users = allUsers.map(user => new User(user.id, user.name, user.last_name));

            return users;
        } catch (error) {
            console.error("Error in MySQL getAll", error);
            return [];
        }
    }

    async addUser(name: string, last_name: string): Promise<User | null> {
        try{
            const createdUser = await UserModel.create({name, last_name});
            return new User(createdUser.id, createdUser.name, createdUser.last_name);
        }catch(error){
            console.error("Error In Psql", error)
            return null;
        }
    }

}