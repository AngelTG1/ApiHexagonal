import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";

export class AddUserUseCase{
    constructor( readonly userRepository: UserRepository){}
    async run ( name: string, email: string): Promise<User | null>{
        try{
            const createUser = await this.userRepository.addUser(name, email);
            return createUser;
        } catch(error){
            console.error('Error in AddUserCase', error);
            return null
        }
        
    }
}