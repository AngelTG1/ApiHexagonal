import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";

export class UpdateUserUseCase{
    constructor(readonly userRepository: UserRepository){}

    async run(id: number, name: string, email: string, password: string): Promise<User | null> {
        try {
            const result = await this.userRepository.UpdateUser(id, name, email, password);
            return result;
        } catch (error) {
            return null;
        }
    } 
}