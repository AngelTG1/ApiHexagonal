import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";

export class GetUserUseCase{
    constructor(readonly userRepository: UserRepository){}

    async run(): Promise<User[] | null> {
        try {
            const result = await this.userRepository.getAll();
            console.log(result); 
            return result;
        } catch (error) {
            return null;
        }
    } 
}